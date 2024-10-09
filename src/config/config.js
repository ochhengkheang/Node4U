import dotenv from "dotenv";

dotenv.config(".env");

export const isProduction = process.env.NODE_ENV === "production";

const mainConfig = {
  baseUrl: isProduction
    ? `${process.env.PRODUCTION_BASE_URL}`
    : `${process.env.DEVELOPMENT_BASE_URL}:${process.env.PORT || 3300}`,
  port: process.env.PORT || 3300,
  nodeEnv: process.env.NODE_ENV,
  trustProxy: isProduction ? false : true,
};

const apiConfig = {
  googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
};

const redisConfig = {
  redisPort: process.env.PRODUCTION_REDIS_PORT,
  redisPassword: process.env.PRODUCTION_REDIS_PASSWORD,
  redisHost: process.env.PRODUCTION_REDIS_HOST,
};

const pgConfig = {
  pgHost: process.env.PRODUCTION_PG_HOST,
  pgUser: process.env.PRODUCTION_PG_USER,
  pgPort: process.env.PRODUCTION_PG_PORT,
  pgPassword: process.env.PRODUCTION_PG_PASSWORD,
  pgDatabase: process.env.PRODUCTION_PG_DATABASE,
  pgSsl: process.env.PRODUCTION_PG_SSL,
};

const cloudinaryConfig = {
  cloudinaryName: process.env.PRODUCTION_CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.PRODUCTION_CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.PRODUCTION_CLOUDINARY_API_SECRET,
};
const authConfig = {
  authJwtSecret: process.env.AUTHENTICATION_JWT_SECRET,
  authRefreshTokenExpiresIn: process.env.AUTHENTICATION_ACCESS_TOKEN_EXPIRES_IN,
  authAccessTokenExpiresIn: process.env.AUTHENTICATION_REFRESH_TOKEN_EXPIRES_IN,
};

export const config = {
  mainConfig: mainConfig,
  pgConfig: pgConfig,
  redisConfig: redisConfig,
  cloudinaryConfig: cloudinaryConfig,
  authConfig: authConfig,
  apiConfig: apiConfig,
};
