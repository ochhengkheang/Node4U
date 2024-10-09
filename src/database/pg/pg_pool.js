import pg from "pg";
import { config } from "../../config/config.js";

const { Pool } = pg;

export const pool = new Pool({
  host: config.pgConfig.pgHost,
  user: config.pgConfig.pgUser,
  port: config.pgConfig.pgPort,
  password: config.pgConfig.pgPassword,
  database: config.pgConfig.pgDatabase,
  ssl: config.pgConfig.pgSsl,
});

pool.on("connect", () => {
  console.log("Database connected");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
