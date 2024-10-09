import {
  getAUserFilteredByUsername,
  postAUserQuery,
  putAUserQuery,
} from "../database/pg/query/pg_query_user.js";
import { config } from "../config/config.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import {
  getATokenFilteredByRefreshToken,
  postATokenQuery,
  putATokenQuery,
} from "../database/pg/query/pg_query_token.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookie.js";
import {
  storeAccessToken,
  storeRefreshToken,
} from "../database/redis/services/token_service.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const postRegisterController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const accessToken = generateAccessToken(username);

    const refreshToken = generateRefreshToken(username);

    const verifyCode = crypto.randomBytes(32).toString("hex");
    const verificationCode = crypto
      .createHash("sha256")
      .update(verifyCode)
      .digest("hex");

    const user = await postAUserQuery(username, hashedPassword, null);

    const token = await postATokenQuery(accessToken, refreshToken);

    await putAUserQuery(
      user[0].username,
      user[0].password,
      token[0].id,
      user[0].id
    );

    res.status(200).json({
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postLogoutController = async (req, res) => {
  const { username } = req.user;

  const user = await getAUserFilteredByUsername(username);
  if (user.length <= 0) {
    return res.status(404).json({ message: "User not found" });
  }

  await putATokenQuery(null, null, user[0].token.token_id);

  await storeAccessToken(user[0].id, null);
  await storeRefreshToken(user[0].id, null);

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.clearCookie("logged_in");

  res.status(200).json({ message: "Logout successful" });
  try {
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

// Login
export const postTokenController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getAUserFilteredByUsername(username);

    if (user.length <= 0) {
      return res
        .status(401)
        .json({ status: 401, message: "Username or password is incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Username or password is incorrect.",
      });
    }

    const user_token_id = user[0].token.token_id;
    const user_username = user[0].username;

    // Sign Tokens
    const accessToken = generateAccessToken(user_username);
    const refreshToken = generateRefreshToken(user_username);

    await putATokenQuery(accessToken, refreshToken, user_token_id);

    await storeAccessToken(user[0].user_id, accessToken);
    await storeRefreshToken(user[0].user_id, refreshToken);

    res.cookie("access_token", accessToken, [accessTokenCookieOptions]);
    res.cookie("refresh_token", refreshToken, [refreshTokenCookieOptions]);
    res.cookie("logged_in", true, [
      {
        ...accessTokenCookieOptions,
        httpOnly: false,
      },
    ]);

    res.status(200).json({
      message: "Login Successfully. Check cookies.",
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postTokenRefreshController = async (req, res) => {
  try {
    // Refresh token
    const { token } = req.body;

    if (!token)
      return res.status(401).json({
        message: "Forbidden",
      });

    const user_token = await getATokenFilteredByRefreshToken(token);

    if (user_token.length <= 0)
      return res.status(403).json({
        message: "Unauthorized",
      });

    jwt.verify(
      user_token[0].refresh_token,
      config.authConfig.authJwtSecret,
      async (err, result) => {
        if (err)
          return res.status(403).json({
            message: "Session expired. Please login again.",
          });
        const accessToken = generateAccessToken(result.username);

        const user = await getAUserFilteredByUsername(result.username);
        if (user.length <= 0)
          return res.status(403).json({
            message: "Unauthorized",
          });

        await putATokenQuery(
          accessToken,
          user[0].token.refresh_token,
          user[0].token.token_id
        );

        await storeAccessToken(user[0].user_id, accessToken);

        return res.status(200).json({
          access_token: accessToken,
        });
      }
    );
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
