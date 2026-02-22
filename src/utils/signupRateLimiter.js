import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "./redisClient.js";
import httpErrors from "./httpErrors.js";

const signupLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "signup",
  points: 5, //request
  duration: 60, // seconds
});

export default async function signupRateLimiter(req, res, next) {
  try {
    await signupLimiter.consume(req.ip);
    next();
  } catch (error) {
    httpErrors.tooManyRequests({
      error: "Too many signup attempts. Try again later.",
    });
    console.log(error);
  }
}
