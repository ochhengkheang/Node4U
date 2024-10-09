import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Generate access token
export const generateAccessToken = (username) => {
  return jwt.sign({ username }, config.authConfig.authJwtSecret, {
    expiresIn: `${config.authConfig.authAccessTokenExpiresIn} days`,
  });
};

// Generate refresh token
export const generateRefreshToken = (username) => {
  return jwt.sign({ username }, config.authConfig.authJwtSecret, {
    expiresIn: `${config.authConfig.authRefreshTokenExpiresIn} days`,
  });
};
