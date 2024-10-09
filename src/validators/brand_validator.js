// validators/BrandValidator.js
import { query, body, validationResult } from "express-validator";

export const validateBrandQuery = [
  query("category_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
  query("name")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  query("description")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  query("offset")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Offset must be an interger"),
  query("limit")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Limit must be an interger"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateBrandBodyRequired = [
  body("category_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("image_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Image ID must be an integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateBrandBodyOptional = [
  body("category_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("name")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("image_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Image ID must be an integer"),

  // Custom validation to check at least one field is provided
  (req, res, next) => {
    const errors = validationResult(req);

    // Check if all fields are missing
    const { category_id, name, description, image_id } = req.body;
    if (!category_id && !name && !description && !image_id) {
      return res.status(400).json({
        errors: [
          {
            msg: "At least one of  'category_id', 'name', 'description', or 'image_id' fields must be provided",
          },
        ],
      });
    }

    // Check if there are other validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If all validations pass, proceed to the next middleware
    next();
  },
];
