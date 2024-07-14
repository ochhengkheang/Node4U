import express from "express";
import {
  deleteUserByIdController,
  getUserByIdController,
  getUserController,
  patchUserByIdController,
  postUserController,
  putUserByIdController,
} from "../controllers/user_controller.js";
import {
  validateUserBodyOptional,
  validateUserBodyRequired,
  validateUserQuery,
} from "../validators/user_validator.js";

export const userRoute = express.Router();

userRoute
  .route("/")
  .get(validateUserQuery, getUserController)
  .post(validateUserBodyRequired, postUserController);

userRoute
  .route("/:id")
  .get(getUserByIdController)
  .put(validateUserBodyRequired, putUserByIdController)
  .patch(validateUserBodyOptional, patchUserByIdController)
  .delete(deleteUserByIdController);
