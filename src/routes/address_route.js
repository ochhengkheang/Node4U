import express from "express";
import {
  deleteAddressByIdController,
  getAddressController,
  patchAddressByIdController,
  postAddressController,
} from "../controllers/address_controller.js";
import {
  validatePatchAddress,
  validatePostAddress,
} from "../validators/addresses_validator.js";

export const addressRoute = express.Router();

addressRoute
  .route("/")
  .get(getAddressController)
  .post(validatePostAddress, postAddressController);

addressRoute
  .route("/:id")
  .patch(validatePatchAddress, patchAddressByIdController)
  .delete(deleteAddressByIdController);
