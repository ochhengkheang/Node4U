import pg from "pg";
import { config, pgConfig } from "../config/config.js";

const { Pool } = pg;

export const pool = new Pool({
  host: pgConfig.pgHost,
  user: pgConfig.pgUser,
  port: pgConfig.pgPort,
  password: pgConfig.pgPassword,
  database: pgConfig.pgDatabase,
  ssl: pgConfig.pgSsl,
});

pool.on("connect", () => {
  console.log("Database connected");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
