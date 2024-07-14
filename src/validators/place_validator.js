import { query, body, validationResult } from "express-validator";

export const validatePlaceQuery = [
  query("label").optional().isString().withMessage("Label must be a string"),
  query("name").optional().isString().withMessage("Name must be a string"),
  query("address")
    .optional()
    .isString()
    .withMessage("Address must be a string"),
  query("offset").optional().isInt().withMessage("Offset must be an interger"),
  query("limit").optional().isInt().withMessage("Limit must be an interger"),
  body("user_id").optional().isInt().withMessage("User ID must be an integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validatePlaceBodyRequired = [
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

export const validatePlaceBodyOptional = [
  // Validate user_id if present
  body("user_id").optional().isInt().withMessage("User ID must be an integer"),

  // Validate place_id if present
  body("place_id")
    .optional()
    .isString()
    .withMessage("Place ID must be a string"),

  // Validate lat if present
  body("lat").optional().isFloat().withMessage("Latitude must be a float"),

  // Validate lng if present
  body("lng").optional().isFloat().withMessage("Longitude must be a float"),

  // Validate label if present
  body("label").optional().isString().withMessage("Label must be a string"),

  // Validate name if present
  body("name").optional().isString().withMessage("Name must be a string"),

  // Validate address if present
  body("address").optional().isString().withMessage("Address must be a string"),

  // Validate link if present
  body("link").optional().isURL().withMessage("Link must be a valid URL"),

  body("image_id")
    .optional()
    .isInt()
    .withMessage("Image ID must be an integer"),

  // Custom validation to check at least one field is provided
  (req, res, next) => {
    const errors = validationResult(req);

    // Check if all fields are missing
    const {
      user_id,
      place_id,
      lat,
      lng,
      label,
      name,
      address,
      link,
      image_id,
    } = req.body;
    if (
      !user_id &&
      !place_id &&
      !lat &&
      !lng &&
      !label &&
      !name &&
      !address &&
      !link &&
      !image_id
    ) {
      return res.status(400).json({
        errors: [
          { msg: "At least one of the fields 'label' must be provided" },
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
