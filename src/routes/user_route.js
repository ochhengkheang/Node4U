import express from "express";
import {
  deleteUserProfileByIdController,
  getUserProfileByIdController,
  getUserProfileController,
  patchUserProfileByIdController,
  postUserProfileController,
  putUserProfileByIdController,
} from "../controllers/user_profile_controller.js";
import {
  validateUserProfileBodyOptional,
  validateUserProfileBodyRequired,
} from "../validators/user_validator.js";
import { authenticateToken } from "../middlewares/jwt_validate.js";

export const userRoute = express.Router();

userRoute
  .route("/")
  .get(validateUserProfileBodyRequired, getUserProfileController)
  .post(
    authenticateToken,
    validateUserProfileBodyRequired,
    postUserProfileController
  );

userRoute
  .route("/:id")
  .get(getUserProfileByIdController)
  .put(
    authenticateToken,
    validateUserProfileBodyRequired,
    putUserProfileByIdController
  )
  .patch(
    authenticateToken,
    validateUserProfileBodyOptional,
    patchUserProfileByIdController
  )
  .delete(authenticateToken, deleteUserProfileByIdController);
