import { config } from "../../config/config.js";

import redis from "redis";

export const redisClient = redis.createClient({
  password: config.redisConfig.redisPassword,
  socket: {
    host: config.redisConfig.redisHost,
    port: config.redisConfig.redisPort,
  },
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});
