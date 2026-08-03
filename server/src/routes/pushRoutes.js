import { Router } from "express";
import {
  subscribe,
  unsubscribe,
  sendPush,
  getVapidPublicKey,
} from "../controllers/pushController.js";

const router = Router();

// Public – client uses this to get the VAPID public key before subscribing
router.get("/vapid-public-key", getVapidPublicKey);

// Client registers its push subscription
router.post("/subscribe", subscribe);

// Client removes its push subscription (e.g. on settings toggle)
router.post("/unsubscribe", unsubscribe);

// Internal/admin – broadcast a push to all subscribers
// Protect with an env-based secret header in production
router.post("/send", sendPush);

export default router;
