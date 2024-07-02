import express from "express";
import {
  deleteEmployeeByIdController,
  getEmployeeByIdController,
  getEmployeeController,
  postEmployeeController,
  updateEmployeeByIdController,
} from "../controllers/employee_controller.js";
import {
  validatePostEmployee,
  validatePutEmployee,
} from "../validators/employee_validator.js";

export const employeeRoute = express.Router();

employeeRoute
  .route("/")
  .get(getEmployeeController)
  .post(validatePostEmployee, postEmployeeController);

employeeRoute
  .route("/:id")
  .get(getEmployeeByIdController)
  .put(validatePutEmployee, updateEmployeeByIdController)
  .delete(deleteEmployeeByIdController);
