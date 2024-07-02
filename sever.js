import { app } from "./app.js";
import { config } from "./src/config/config.js";

const sever = app;

sever.listen(config.port, () => {
  console.log(
    `Sever is running in ${config.nodeEnv} mode on: http://localhost:${config.port}`
  );
});
