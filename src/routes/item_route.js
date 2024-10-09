import express from "express";
import {
  deleteItemByIdController,
  getItemByIdController,
  getItemController,
  patchItemByIdController,
  postItemController,
  putItemByIdController,
} from "../controllers/item_controller.js";
import {
  validateItemBodyOptional,
  validateItemBodyRequired,
  validateItemQuery,
} from "../validators/item_validator.js";
import { authenticateToken } from "../middlewares/jwt_validate.js";

export const itemRoute = express.Router();

itemRoute
  .route("/")
  .get(validateItemQuery, getItemController)
  .post(authenticateToken, validateItemBodyRequired, postItemController);
itemRoute
  .route("/:id")
  .get(getItemByIdController)
  .put(authenticateToken, validateItemBodyRequired, putItemByIdController)
  .patch(authenticateToken, validateItemBodyOptional, patchItemByIdController)
  .delete(authenticateToken, deleteItemByIdController);
