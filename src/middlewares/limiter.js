import { redisClient } from "../database/redis/redis_client.js";

import RedisStore from "rate-limit-redis";
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  // Redis store configuration
  //   store: new RedisStore({
  //     sendCommand: (...args) => redisClient.sendCommand(args),
  //   }),

  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
