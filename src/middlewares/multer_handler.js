import { MulterError } from "multer";

export const multerHandler = (err, req, res, next) => {
  /// Middleware for handling multipart/form-data

  if (err instanceof MulterError && err.status == 500 && "body" in err) {
    return res.status(400).json({ error: "MulterError: " + err.message });
  }

  if (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }

  next();
};
