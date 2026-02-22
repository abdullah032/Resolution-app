import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "./redisClient.js";
import httpErrors from "./httpErrors.js";

const signupLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "login",
  points: 5, //request
  duration: 60, // seconds
});

export default async function loginRateLimiter(req, res, next) {
  const key = `${req.ip}:${req.body?.email || "unknown"}`;
  try {
    await signupLimiter.consume(key);
    await next();
  } catch (error) {
    console.log("Retry after:", error.msBeforeNext / 1000, "seconds");
    if (error?.msBeforeNext) {
      throw httpErrors.tooManyRequests({
        error: "Too many login attempts. Try again later.",
        retryAfter: Math.ceil(error.msBeforeNext / 1000),
      });
    }
    throw error;
  }
}
