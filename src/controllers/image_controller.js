import {
  deleteAImageQuery,
  postAImageQuery,
} from "../database/query/pg_query_image.js";
import { uploadImage } from "../helpers/cloudinary.js";

export const postUploadTypeByIdController = async (req, res) => {
  try {
    const { file } = req;
    const { id, type } = req.params;

    const image_url = await uploadImage(id, type, file);

    // upload to database
    await postAImageQuery(image_url);

    return res.status(201).send({
      message: "Image Upload Successfully",
      image_url: image_url,
    });
  } catch (error) {
    return res.status(error.code ?? 500).json({ message: error.message });
  }
};
