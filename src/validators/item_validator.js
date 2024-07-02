// validators/itemValidator.js
import { body, validationResult } from "express-validator";

export const validatePostItem = [
  body("id")
    .notEmpty()
    .withMessage("ID is required")
    .isInt()
    .withMessage("ID must be an integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be a float"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validatePutItem = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be a float"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validatePatchItem = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("categoryId")
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("price").optional().isFloat().withMessage("Price must be a float"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
