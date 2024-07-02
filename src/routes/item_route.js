import express from "express";
import {
  deleteItemByIdController,
  getItemByIdController,
  getItemController,
  patchItemByIdController,
  postItemController,
  putItemByIdController,
} from "../controllers/item_controller.js";
import { validatePostItem } from "../validators/item_validator.js";

export const itemRoute = express.Router();

itemRoute
  .route("/")
  .get(getItemController)
  .post(validatePostItem, postItemController);
itemRoute
  .route("/:id")
  .get(getItemByIdController)
  .put(putItemByIdController)
  .patch(patchItemByIdController)
  .delete(deleteItemByIdController);
