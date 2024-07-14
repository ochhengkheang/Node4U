import express from "express";
import {
  deleteEmployeeByIdController,
  getEmployeeByIdController,
  getEmployeeController,
  patchEmployeeByIdController,
  postEmployeeController,
  putEmployeeByIdController,
} from "../controllers/employee_controller.js";
import {
  validateEmployeeBodyOptional,
  validateEmployeeBodyRequired,
  validateEmployeeQuery,
} from "../validators/employee_validator.js";

export const employeeRoute = express.Router();

employeeRoute
  .route("/")
  .get(validateEmployeeQuery, getEmployeeController)
  .post(validateEmployeeBodyRequired, postEmployeeController);

employeeRoute
  .route("/:id")
  .get(getEmployeeByIdController)
  .put(validateEmployeeBodyRequired, putEmployeeByIdController)
  .patch(validateEmployeeBodyOptional, patchEmployeeByIdController)
  .delete(deleteEmployeeByIdController);
