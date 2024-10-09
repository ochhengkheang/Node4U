import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({
      message: "Forbidden",
    });

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: "Forbidden",
    });

  jwt.verify(token, config.authConfig.authJwtSecret, (err, result) => {
    if (err)
      return res.status(401).json({
        message: "Unauthorized",
      });
    req.username = result.username;
    next();
  });
};
