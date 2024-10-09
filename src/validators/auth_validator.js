import { query, body, validationResult } from "express-validator";

export const validateLoginBodyRequired = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateRegisterBodyRequired = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("Username must be between 6 and 100 characters long")
    .isString()
    .withMessage("Username must be a string"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be between 6 and 100 characters long")
    .isString()
    .withMessage("Password must be a string")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character.")
    .matches(/^\S*$/)
    .withMessage("Password must not contain spaces"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const sanitizePassword = (req, res, next) => {
  if (req.body.password) {
    req.body.password = sanitize.prepareSanitize(req.body.password, {
      xss: true,
      noSql: true,
      sql: false, // Disable SQL sanitization for password
      sqlLevel: 1,
      noSqlLevel: 1,
      forbiddenTags: [],
      level: "strict",
      allowedKeys: [],
      customizeFile: null,
    });
  }
  next();
};
