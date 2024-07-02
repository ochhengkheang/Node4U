import dotenv from "dotenv";

dotenv.config(".env");

export const config = {
  port: process.env.PORT || 3300,
  nodeEnv: process.env.NODE_ENV,
  googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
};
