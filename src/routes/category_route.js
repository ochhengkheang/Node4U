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
import { authenticateToken } from "../middlewares/jwt_validate.js";

export const categoryRoute = express.Router();

categoryRoute
  .route("/")
  .get(validateCategoryQuery, getCategoryController)
  .post(
    authenticateToken,
    validateCategoryBodyRequired,
    postCategoryController
  );

categoryRoute
  .route("/:id")
  .get(getCategoryByIdController)
  .put(
    authenticateToken,
    validateCategoryBodyRequired,
    putCategoryByIdController
  )
  .patch(
    authenticateToken,
    validateCategoryBodyOptional,
    patchCategoryByIdController
  )
  .delete(authenticateToken, deleteCategoryByIdController);
