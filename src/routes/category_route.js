import express from "express";
import {
  deleteCategoryByIdController,
  getCategoryByIdController,
  getCategoryController,
  patchCategoryByIdController,
  postCategoryController,
  putCategoryByIdController,
} from "../controllers/category_controller.js";
import {
  validatePatchCategory,
  validatePostCategory,
  validatePutCategory,
} from "../validators/category_validator.js";

export const categoryRoute = express.Router();

categoryRoute
  .route("/")
  .get(getCategoryController)
  .post(validatePostCategory, postCategoryController);

categoryRoute
  .route("/:id")
  .get(getCategoryByIdController)
  .put(validatePutCategory, putCategoryByIdController)
  .patch(validatePatchCategory, patchCategoryByIdController)
  .delete(deleteCategoryByIdController);
