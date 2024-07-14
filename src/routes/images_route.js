import express from "express";
import { postUploadTypeByIdController } from "../controllers/image_controller.js";
import { validateImageParams } from "../validators/image_validator.js";
import { multerHandler } from "../middlewares/multer_handler.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const imageRoute = express.Router();

imageRoute
  .route("/upload/:type/:id")
  .post(
    validateImageParams,
    upload.single("image"),
    multerHandler,
    postUploadTypeByIdController
  );
