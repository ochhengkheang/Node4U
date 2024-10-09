import { deleteAImageQuery } from "../database/pg/query/pg_query_image.js";
import {
  deleteAUserProfileQuery,
  getAUserProfileFilteredByIdQuery,
  getUserProfilesFilteredAutoQuery,
  postAUserProfileQuery,
  putAUserProfileQuery,
} from "../database/pg/query/pg_query_user_profile.js";
import { deleteImage } from "../helpers/cloudinary.js";

export const getUserProfileController = async (req, res) => {
  try {
    const { name, email, offset, limit } = req.query;

    const users = await getUserProfilesFilteredAutoQuery(
      name,
      email,
      offset,
      limit
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const getUserProfileByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getAUserProfileFilteredByIdQuery(id);

    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ status: 404, message: `User not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postUserProfileController = async (req, res) => {
  try {
    const { name, email, image_id } = req.body;

    await postAUserProfileQuery(name, email, !image_id ? null : image_id);

    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const putUserProfileByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, image_id } = req.body;

    const user = await getAUserProfileFilteredByIdQuery(id);

    if (user.length > 0) {
      await putAUserProfileQuery(
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

export const patchUserProfileByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, image_id } = req.body;

    const user = await getAUserProfileFilteredByIdQuery(id);

    if (user.length > 0) {
      await putAUserProfileQuery(
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

export const deleteUserProfileByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getAUserProfileFilteredByIdQuery(id);

    if (user.length > 0) {
      await deleteAUserProfileQuery(id);

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
