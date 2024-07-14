import { param, validationResult } from "express-validator";

export const validateImageParams = [
  param("type")
    .isIn(["brands", "items", "users", "employees", "places", "categories"])
    .withMessage("Invalid type"),
  param("id").isInt().withMessage("Id must be integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
