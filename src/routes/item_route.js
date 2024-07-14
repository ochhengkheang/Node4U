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

export const itemRoute = express.Router();

itemRoute
  .route("/")
  .get(validateItemQuery, getItemController)
  .post(validateItemBodyRequired, postItemController);
itemRoute
  .route("/:id")
  .get(getItemByIdController)
  .put(validateItemBodyRequired, putItemByIdController)
  .patch(validateItemBodyOptional, patchItemByIdController)
  .delete(deleteItemByIdController);
