import { app } from "./app.js";
import { config } from "./src/config/config.js";
import { pool } from "./src/database/pg/pg_pool.js";

const server = app.listen(config.mainConfig.port, () => {
  console.log(
    `Server is running in ${config.mainConfig.nodeEnv} mode on: ${config.mainConfig.baseUrl}`
  );
});

const shutdown = async () => {
  console.log("Shutting down server...");
  try {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    console.log("Server closed");
    await pool.end();
    console.log("Database pool closed");
  } catch (err) {
    console.error("Error during shutdown", err);
  }
};

const addListeners = () => {
  process.once("exit", (code) => {
    console.log(`Process exited with code: ${code}`);
  });

  process.once("SIGINT", async () => {
    console.log("Process interrupted (SIGINT)");
    await shutdown();
    process.exit();
  });

  process.once("SIGTERM", async () => {
    console.log("Process terminated (SIGTERM)");
    await shutdown();
    process.exit();
  });
};

addListeners();
