import dotenv from "dotenv";

dotenv.config(".env");

const isProduction = process.env.NODE_ENV === "production";
// console.log(isProduction);

export const config = {
  baseUrl: isProduction
    ? `${process.env.PRODUCTION_BASE_URL}`
    : `${process.env.DEVELOPMENT_BASE_URL}:${process.env.PORT || 3300}`,
  port: process.env.PORT || 3300,
  nodeEnv: process.env.NODE_ENV,
  googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
};

export const pgConfig = {
  pgHost: process.env.PRODUCTION_PG_HOST,
  pgUser: process.env.PRODUCTION_PG_USER,
  pgPort: process.env.PRODUCTION_PG_PORT,
  pgPassword: process.env.PRODUCTION_PG_PASSWORD,
  pgDatabase: process.env.PRODUCTION_PG_DATABASE,
  pgSsl: process.env.PRODUCTION_PG_SSL,
};

export const cloudinaryConfig = {
  cloudinaryName: process.env.PRODUCTION_CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.PRODUCTION_CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.PRODUCTION_CLOUDINARY_API_SECRET,
};
