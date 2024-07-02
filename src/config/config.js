import dotenv from "dotenv";

dotenv.config(".env");

const isProduction = process.env.NODE_ENV === "production";
// console.log(isProduction);

export const config = {
  baseUrl: isProduction
    ? "https://node4u.onrender.com"
    : `${process.env.BASE_URL}:${process.env.PORT || 3300}`,
  port: process.env.PORT || 3300,
  nodeEnv: process.env.NODE_ENV,
  googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
};
