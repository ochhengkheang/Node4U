import { config, isProduction } from "../config/config.js";

const cookiesOptions = {
  httpOnly: true,
  sameSite: "lax",
};

isProduction ? cookiesOptions.secure : true;

export const accessTokenCookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() +
      config.authConfig.authAccessTokenExpiresIn * 24 * 60 * 60 * 1000
  ),
  maxAge: config.authConfig.authAccessTokenExpiresIn * 24 * 60 * 60 * 1000,
};

export const refreshTokenCookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() +
      config.authConfig.refreshTokenCookieOptions * 24 * 60 * 60 * 1000
  ),
  maxAge: config.authConfig.refreshTokenCookieOptions * 24 * 60 * 60 * 1000,
};
