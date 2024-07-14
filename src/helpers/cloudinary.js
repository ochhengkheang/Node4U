import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/config.js";
import { customCloudinaryException } from "./exception.js";

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudinaryName,
  api_key: cloudinaryConfig.cloudinaryApiKey,
  api_secret: cloudinaryConfig.cloudinaryApiSecret,
});

export const deleteImage = async (id, type) => {
  try {
    const public_id = `${type}/${id}`;

    const destroyResult = await cloudinary.uploader.destroy(public_id);

    return destroyResult;
  } catch (error) {
    throw customCloudinaryException(error);
  }
};

export const uploadImage = async (id, type, file) => {
  try {
    const public_id = `${type}/${id}`;

    // Upload an imageW
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: public_id,
    });

    // console.log("Upload result:");
    // console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    // console.log("Optimized Url:");
    // console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    // console.log("Autocrop Url:");
    // console.log(autoCropUrl);

    return uploadResult.secure_url;
  } catch (error) {
    // console.log(error);
    throw customCloudinaryException(error);
  }
};
