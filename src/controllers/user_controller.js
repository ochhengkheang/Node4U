import { deleteAImageQuery } from "../database/query/pg_query_image.js";
import {
  deleteAUserQuery,
  getAUserFilteredByIdQuery,
  getUsersFilteredAutoQuery,
  postAUserQuery,
  putAUserQuery,
} from "../database/query/pg_query_user.js";
import { deleteImage } from "../helpers/cloudinary.js";

export const getUserController = async (req, res) => {
  try {
    const { name, email, offset, limit } = req.query;

    const users = await getUsersFilteredAutoQuery(name, email, offset, limit);

    res.status(200).json(users);
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getAUserFilteredByIdQuery(id);

    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ status: 404, message: `User not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postUserController = async (req, res) => {
  try {
    const { name, email, image_id } = req.body;

    await postAUserQuery(name, email, !image_id ? null : image_id);

    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const putUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, image_id } = req.body;

    const user = await getAUserFilteredByIdQuery(id);

    if (user.length > 0) {
      await putAUserQuery(
        name,
        email,
        !image_id ? user[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Update successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `User not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const patchUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, image_id } = req.body;

    const user = await getAUserFilteredByIdQuery(id);

    if (user.length > 0) {
      await putAUserQuery(
        !name ? user[0].name : name,
        !email ? user[0].email : email,
        !image_id ? user[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Patch successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `User not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const deleteUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getAUserFilteredByIdQuery(id);

    if (user.length > 0) {
      await deleteAUserQuery(id);

      await deleteAImageQuery(user[0].image.image_id);

      await deleteImage(id, "users");

      res.status(201).json({
        status: 201,
        message: `Delete successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `User not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
