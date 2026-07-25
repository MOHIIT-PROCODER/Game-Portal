import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

export const rateLimitMiddleware = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: env.NODE_ENV === "development" ? 10000 : 120, // Increase rate limit threshold in dev
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after a minute.",
  },
});
