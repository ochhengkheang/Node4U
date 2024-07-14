import { query, body, validationResult } from "express-validator";

export const validateUserQuery = [
  query("name").optional().isString().withMessage("Name must be a string"),
  query("email").optional().isString().withMessage("Email must be a string"),
  query("offset").optional().isInt().withMessage("Offset must be an interger"),
  query("limit").optional().isInt().withMessage("Limit must be an interger"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUserBodyRequired = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isString()
    .withMessage("Email must be a string"),
  body("image_id")
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

export const validateUserBodyOptional = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email").optional().isString().withMessage("Email must be a string"),
  body("image_id")
    .optional()
    .isInt()
    .withMessage("Image ID must be an integer"),

  (req, res, next) => {
    const errors = validationResult(req);

    const { name, email, image_id } = req.body;

    // Check if both name and email are missing
    if (!name && !email && !image_id) {
      return res.status(400).json({
        errors: [
          {
            msg: "At least one of 'name', 'email', or 'image_id' fields must be provided",
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
