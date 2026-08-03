import { api } from "./api";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const pushService = {
  /**
   * Check if push notifications are supported in current browser
   */
  isSupported() {
    return (
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window
    );
  },

  /**
   * Check current permission status: 'granted', 'denied', or 'default'
   */
  getPermissionState() {
    if (!("Notification" in window)) return "unsupported";
    return Notification.permission;
  },

  /**
   * Get active subscription if exists
   */
  async getSubscription() {
    if (!this.isSupported()) return null;
    const registration = await navigator.serviceWorker.ready;
    return registration.pushManager.getSubscription();
  },

  /**
   * Request permission and subscribe to Push server
   */
  async subscribe() {
    if (!this.isSupported()) {
      throw new Error("Push notifications are not supported by your browser.");
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Notification permission was not granted.");
    }

    // 1. Get VAPID public key from backend
    const { publicKey } = await api.get("/push/vapid-public-key");
    if (!publicKey) {
      throw new Error("Failed to retrieve server VAPID key.");
    }

    // 2. Get Service Worker registration
    const registration = await navigator.serviceWorker.ready;

    // 3. Subscribe to push manager
    const applicationServerKey = urlBase64ToUint8Array(publicKey);
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });

    // 4. Send subscription JSON to backend
    await api.post("/push/subscribe", subscription.toJSON());

    return subscription;
  },

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribe() {
    const subscription = await this.getSubscription();
    if (subscription) {
      const endpoint = subscription.endpoint;
      await subscription.unsubscribe();
      try {
        await api.post("/push/unsubscribe", { endpoint });
      } catch (err) {
        console.warn("Unsubscribe notification sent to server failed:", err);
      }
    }
  },
};

export default pushService;
