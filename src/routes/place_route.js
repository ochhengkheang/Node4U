import express from "express";

import {
  deletePlaceByIdController,
  getPlaceByIdController,
  getPlaceController,
  patchPlaceByIdController,
  postPlaceController,
  putPlaceByIdController,
} from "../controllers/place_controller.js";
import {
  validatePlaceBodyOptional,
  validatePlaceBodyRequired,
  validatePlaceQuery,
} from "../validators/place_validator.js";
import { authenticateToken } from "../middlewares/jwt_validate.js";

export const placeRoute = express.Router();

placeRoute
  .route("/")
  .get(validatePlaceQuery, getPlaceController)
  .post(validatePlaceBodyRequired, postPlaceController);

placeRoute
  .route("/:id")
  .get(getPlaceByIdController)
  .put(validatePlaceBodyRequired, putPlaceByIdController)
  .patch(validatePlaceBodyOptional, patchPlaceByIdController)
  .delete(deletePlaceByIdController);
