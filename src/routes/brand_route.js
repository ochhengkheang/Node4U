import express from "express";
import {
  deleteBrandByIdController,
  getBrandByIdController,
  getBrandController,
  patchBrandByIdController,
  postBrandController,
  putBrandByIdController,
} from "../controllers/brand_controller.js";
import {
  validateBrandBodyOptional,
  validateBrandBodyRequired,
  validateBrandQuery,
} from "../validators/brand_validator.js";
import { authenticateToken } from "../middlewares/jwt_validate.js";

export const brandRoute = express.Router();

brandRoute
  .route("/")
  .get(validateBrandQuery, getBrandController)
  .post(authenticateToken, validateBrandBodyRequired, postBrandController);

brandRoute
  .route("/:id")
  .get(getBrandByIdController)
  .put(authenticateToken, validateBrandBodyRequired, putBrandByIdController)
  .patch(authenticateToken, validateBrandBodyOptional, patchBrandByIdController)
  .delete(authenticateToken, deleteBrandByIdController);
