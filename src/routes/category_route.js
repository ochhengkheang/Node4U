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
  validateCategoryBodyOptional,
  validateCategoryBodyRequired,
  validateCategoryQuery,
} from "../validators/category_validator.js";

export const categoryRoute = express.Router();

categoryRoute
  .route("/")
  .get(validateCategoryQuery, getCategoryController)
  .post(validateCategoryBodyRequired, postCategoryController);

categoryRoute
  .route("/:id")
  .get(getCategoryByIdController)
  .put(validateCategoryBodyRequired, putCategoryByIdController)
  .patch(validateCategoryBodyOptional, patchCategoryByIdController)
  .delete(deleteCategoryByIdController);
