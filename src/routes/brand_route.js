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

export const brandRoute = express.Router();

brandRoute
  .route("/")
  .get(validateBrandQuery, getBrandController)
  .post(validateBrandBodyRequired, postBrandController);

brandRoute
  .route("/:id")
  .get(getBrandByIdController)
  .put(validateBrandBodyRequired, putBrandByIdController)
  .patch(validateBrandBodyOptional, patchBrandByIdController)
  .delete(deleteBrandByIdController);
