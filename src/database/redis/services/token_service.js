import { config } from "../../../config/config.js";
import { redisClient } from "../redis_client.js";

export const storeAccessToken = async (userId, accessToken) => {
  try {
    await redisClient.connect();
    await redisClient.set(
      `${userId}-access`,
      accessToken,
      "EX",
      config.authConfig.authAccessTokenExpiresIn * 24 * 60 * 60
    );
  } catch (error) {
    throw Error(error);
  } finally {
    await redisClient.disconnect();
  }
};

export const storeRefreshToken = async (userId, refreshToken) => {
  try {
    await redisClient.connect();
    await redisClient.set(
      `${userId}-refresh`,
      refreshToken,
      "EX",
      config.authConfig.authRefreshTokenExpiresIn * 24 * 60 * 60
    );
  } catch (error) {
    throw Error(error);
  } finally {
    await redisClient.disconnect();
  }
};

export const getAccessToken = async (userId) => {
  try {
    await redisClient.connect();
    const data = await redisClient.get(`${userId}-access`);
    return data;
  } catch (error) {
    throw Error(error);
  } finally {
    await redisClient.disconnect();
  }
};

export const getRefreshToken = async (userId) => {
  try {
    await redisClient.connect();
    const data = await redisClient.get(`${userId}-refresh`);
    return data;
  } catch (error) {
    throw Error(error);
  } finally {
    await redisClient.disconnect();
  }
};

export const deleteToken = async (userId) => {
  try {
    await redisClient.connect();
    await redisClient.del(`${userId}-access`);
    await redisClient.del(`${userId}-refresh`);
  } catch (error) {
    throw Error(error);
  } finally {
    await redisClient.disconnect();
  }
};
