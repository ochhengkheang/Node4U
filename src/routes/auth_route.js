import {
  postLogoutController,
  postRegisterController,
  postTokenController,
  postTokenRefreshController,
} from "../controllers/auth_controller.js";
import {
  validateLoginBodyRequired,
  validateRegisterBodyRequired,
} from "../validators/auth_validator.js";
import { authenticateToken } from "../middlewares/jwt_validate.js";

import express from "express";

export const authRoute = express.Router();

authRoute
  .route("/register")
  .post(validateRegisterBodyRequired, postRegisterController);

authRoute.route("/token").post(validateLoginBodyRequired, postTokenController);

authRoute.route("/token/refresh").post(postTokenRefreshController);

authRoute.route(authenticateToken, "/logout").post(postLogoutController);
