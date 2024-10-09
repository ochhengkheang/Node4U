import {
  deleteACategoryQuery,
  getACategoryFilteredByIdQuery,
  getCategoriesFilteredAutoQuery,
  postACategoryQuery,
  putACategoryQuery,
} from "../database/pg/query/pg_query_category.js";

export const getCategoryController = async (req, res) => {
  try {
    const { name, description, offset, limit } = req.query;

    const categories = await getCategoriesFilteredAutoQuery(
      name,
      description,
      offset,
      limit
    );

    res.status(200).json(categories);
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await getACategoryFilteredByIdQuery(id);

    if (category.length > 0) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ status: 404, message: `Category not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postCategoryController = async (req, res) => {
  try {
    const { name, description, image_id } = req.body;

    await postACategoryQuery(name, description, image_id);

    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const putCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, image_id } = req.body;

    const category = await getACategoryFilteredByIdQuery(id);

    if (category.length > 0) {
      await putACategoryQuery(
        name,
        description,
        !image_id ? category[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Update successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `Category not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const patchCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, image_id } = req.body;

    const category = await getACategoryFilteredByIdQuery(id);

    if (category.length > 0) {
      await putACategoryQuery(
        !name ? category[0].name : name,
        !description ? category[0].description : description,
        !image_id ? category[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Patch successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `Category not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const deleteCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await getACategoryFilteredByIdQuery(id);

    if (category.length > 0) {
      await deleteACategoryQuery(id);

      await deleteAImageQuery(category[0].image.image_id);

      await deleteImage(id, "categories");

      res.status(201).json({
        status: 201,
        message: `Delete successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `Category not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
