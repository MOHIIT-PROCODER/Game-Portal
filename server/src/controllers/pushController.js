import webpush from "web-push";
import { env } from "../config/env.js";
import * as PushSubscription from "../models/pushSubscription.js";

// Configure VAPID credentials once
webpush.setVapidDetails(
  env.VAPID_SUBJECT,
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
);

/**
 * POST /api/push/subscribe
 * Body: { endpoint, keys: { p256dh, auth } }
 */
export const subscribe = async (req, res) => {
  try {
    const subscription = req.body;
    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return res.status(400).json({ error: "Invalid subscription object." });
    }
    await PushSubscription.upsert(subscription);
    res.status(201).json({ message: "Subscription saved." });
  } catch (err) {
    console.error("Push subscribe error:", err);
    res.status(500).json({ error: "Failed to save subscription." });
  }
};

/**
 * POST /api/push/unsubscribe
 * Body: { endpoint }
 */
export const unsubscribe = async (req, res) => {
  try {
    const { endpoint } = req.body;
    if (!endpoint) return res.status(400).json({ error: "Endpoint required." });
    const deleted = await PushSubscription.remove(endpoint);
    res.json({ message: deleted ? "Unsubscribed." : "Not found." });
  } catch (err) {
    console.error("Push unsubscribe error:", err);
    res.status(500).json({ error: "Failed to remove subscription." });
  }
};

/**
 * POST /api/push/send
 * Body: { title, body, icon?, url? }
 * Broadcasts a notification to all subscribers.
 */
export const sendPush = async (req, res) => {
  try {
    const { title = "CrazyGames 🎮", body = "Check out something new!", icon = "/favicon.svg", url = "/" } = req.body;

    const payload = JSON.stringify({ title, body, icon, url });
    const subscriptions = await PushSubscription.getAll();

    if (subscriptions.length === 0) {
      return res.json({ message: "No subscribers.", sent: 0 });
    }

    let sent = 0;
    let failed = 0;
    const stale = [];

    await Promise.allSettled(
      subscriptions.map(async (row) => {
        const sub = {
          endpoint: row.endpoint,
          keys: { p256dh: row.p256dh, auth: row.auth },
        };
        try {
          await webpush.sendNotification(sub, payload);
          sent++;
        } catch (err) {
          failed++;
          // 410 Gone = subscription is expired/revoked, clean it up
          if (err.statusCode === 410) {
            stale.push(row.endpoint);
          }
          console.warn("Push send failed:", row.endpoint, err.statusCode);
        }
      }),
    );

    // Remove stale subscriptions
    for (const endpoint of stale) {
      await PushSubscription.remove(endpoint);
    }

    res.json({ message: "Push sent.", sent, failed, staleRemoved: stale.length });
  } catch (err) {
    console.error("Send push error:", err);
    res.status(500).json({ error: "Failed to send push." });
  }
};

/**
 * GET /api/push/vapid-public-key
 * Returns the VAPID public key so the client can subscribe.
 */
export const getVapidPublicKey = (_req, res) => {
  res.json({ publicKey: env.VAPID_PUBLIC_KEY });
};
