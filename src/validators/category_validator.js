import { query, body, validationResult } from "express-validator";

export const validateCategoryQuery = [
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

export const validateCategoryBodyRequired = [
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

export const validateCategoryBodyOptional = [
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

  (req, res, next) => {
    const errors = validationResult(req);

    const { name, description, image_id } = req.body;

    // Check if both name and description are missing
    if (!name && !description && !image_id) {
      return res.status(400).json({
        errors: [
          {
            msg: "At least one of 'name', 'description', or 'image_id' fields must be provided",
          },
        ],
      });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
