import { body, validationResult } from "express-validator";

export const validatePostAddress = [
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  body("place_id")
    .notEmpty()
    .withMessage("Place ID is required")
    .isString()
    .withMessage("Place ID must be a string"),
  body("lat")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat()
    .withMessage("Latitude must be a float"),
  body("lng")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat()
    .withMessage("Longitude must be a float"),
  body("label")
    .notEmpty()
    .withMessage("Label is required")
    .isString()
    .withMessage("Label must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("link")
    .notEmpty()
    .withMessage("Link is required")
    .isURL()
    .withMessage("Link must be a valid URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validatePutAddress = [
  body("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  body("place_id")
    .notEmpty()
    .withMessage("Place ID is required")
    .isString()
    .withMessage("Place ID must be a string"),
  body("lat")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat()
    .withMessage("Latitude must be a float"),
  body("lng")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat()
    .withMessage("Longitude must be a float"),
  body("label")
    .notEmpty()
    .withMessage("Label is required")
    .isString()
    .withMessage("Label must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("link")
    .notEmpty()
    .withMessage("Link is required")
    .isURL()
    .withMessage("Link must be a valid URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validatePatchAddress = [
  body("user_id").optional().isInt().withMessage("User ID must be an integer"),
  body("place_id")
    .optional()
    .isString()
    .withMessage("Place ID must be a string"),
  body("lat").optional().isFloat().withMessage("Latitude must be a float"),
  body("lng").optional().isFloat().withMessage("Longitude must be a float"),
  body("label").optional().isString().withMessage("Label must be a string"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("link").optional().isURL().withMessage("Link must be a valid URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
