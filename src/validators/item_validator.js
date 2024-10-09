// validators/itemValidator.js
import { query, body, validationResult } from "express-validator";

export const validateItemQuery = [
  query("name")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  query("category_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
  query("brand_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Brand ID must be an integer"),
  query("description")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  query("min_price")
    .trim()
    .escape()
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum Price must be a non-negative number if provided"),
  query("max_price")
    .optional({ min: 0 })
    .isFloat()
    .withMessage("Maximum Price must be a non-negative number if provided"),
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

export const validateItemBodyRequired = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("category_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("brand_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Brand ID is required")
    .isInt()
    .withMessage("Brand ID must be an integer"),
  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("price")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be a float"),
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

export const validateItemBodyOptional = [
  body("name")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  body("category_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("brand_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Brand ID must be an integer"),
  body("description")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("price")
    .trim()
    .escape()
    .optional()
    .isFloat()
    .withMessage("Price must be a float"),
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
    const { name, category_id, brand_id, description, price, image_id } =
      req.body;
    if (
      !name &&
      !category_id &&
      !brand_id &&
      !description &&
      !price &&
      !image_id
    ) {
      return res.status(400).json({
        errors: [
          {
            msg: "At least one of 'name', 'category_id', 'brand_id', 'description', 'price', or image_id fields must be provided",
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
