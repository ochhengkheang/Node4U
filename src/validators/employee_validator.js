import { query, body, validationResult } from "express-validator";

export const validateEmployeeQuery = [
  query("user_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("User ID must be an integer"),
  query("name")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  query("from")
    .trim()
    .escape()
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("From must be in 'yyyy-mm-dd' format"),
  query("to")
    .trim()
    .escape()
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("To must be in 'yyyy-mm-dd' format"),
  query("email")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Email must be a string"),
  query("address")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Address must be a string"),
  query("phone")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Phone must be a string"),
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

    // Validate first b4 validate the from and to
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { from, to } = req.query;
    if ((from && !to) || (!from && to)) {
      return res.status(400).json({
        errors: [
          {
            msg: "Both 'from' and 'to' fields must be provided",
          },
        ],
      });
    }
    next();
  },
];

export const validateEmployeeBodyRequired = [
  body("user_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("dob")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .toDate()
    .withMessage("Date of birth must be in 'yyyy-mm-dd' format"),
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("address")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("phone")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string"),
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

export const validateEmployeeBodyOptional = [
  body("user_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("User ID must be an integer"),
  body("name")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  body("dob")
    .trim()
    .escape()
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date of birth must be in 'yyyy-mm-dd' format"),
  body("email")
    .trim()
    .escape()
    .optional()
    .isEmail()
    .withMessage("Email must be valid"),
  body("address")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Address must be a string"),
  body("phone")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Phone must be a string"),
  body("image_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Image ID must be an integer"),

  // Custom validation to check at least one field is provided
  (req, res, next) => {
    const errors = validationResult(req);

    // Check if both name and email are missing
    const { user_id, name, dob, email, address, phone, image_id } = req.body;

    if (
      !user_id &&
      !name &&
      !dob &&
      !email &&
      !address &&
      !phone &&
      !image_id
    ) {
      return res.status(400).json({
        errors: [
          {
            msg: "At least one of 'user_id', 'name', 'dob', 'email', 'address', 'phone', or 'image_id' fields must be provided",
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
