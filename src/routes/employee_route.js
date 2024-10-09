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
import { authenticateToken } from "../middlewares/jwt_validate.js";

export const employeeRoute = express.Router();

employeeRoute
  .route("/")
  .get(validateEmployeeQuery, getEmployeeController)
  .post(
    authenticateToken,
    validateEmployeeBodyRequired,
    postEmployeeController
  );

employeeRoute
  .route("/:id")
  .get(getEmployeeByIdController)
  .put(
    authenticateToken,
    validateEmployeeBodyRequired,
    putEmployeeByIdController
  )
  .patch(
    authenticateToken,
    validateEmployeeBodyOptional,
    patchEmployeeByIdController
  )
  .delete(authenticateToken, deleteEmployeeByIdController);
