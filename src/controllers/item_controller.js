import { deleteAImageQuery } from "../database/query/pg_query_image.js";
import {
  deleteAItemQuery,
  getItemsFilteredAutoQuery,
  getAItemFilteredByIdQuery,
  postAItemQuery,
  putAItemQuery,
} from "../database/query/pg_query_item.js";
import { deleteImage } from "../helpers/cloudinary.js";

export const getItemController = async (req, res) => {
  try {
    const {
      name,
      category_id,
      brand_id,
      description,
      min_price,
      max_price,
      offset,
      limit,
    } = req.query;

    const items = await getItemsFilteredAutoQuery(
      name,
      category_id,
      brand_id,
      description,
      min_price,
      max_price,
      offset,
      limit
    );

    return res.status(200).json(items);
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const getItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await getAItemFilteredByIdQuery(id);

    if (item.length > 0) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postItemController = async (req, res) => {
  try {
    const { name, category_id, brand_id, description, price, image_id } =
      req.body;

    await postAItemQuery(
      name,
      category_id,
      brand_id,
      description,
      price,
      image_id
    );

    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const putItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, category_id, brand_id, description, price, image_id } =
      req.body;

    const item = await getAItemFilteredByIdQuery(id);

    if (item.length > 0) {
      await putAItemQuery(
        name,
        category_id,
        brand_id,
        description,
        price,
        !image_id ? item[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Update successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: "Item not found" });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
export const patchItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, category_id, brand_id, description, price, image_id } =
      req.body;

    const item = await getAItemFilteredByIdQuery(id);

    if (item.length > 0) {
      await putAItemQuery(
        !name ? item[0].name : name,
        !category_id ? item[0].category.category_id : category_id,
        !brand_id ? item[0].brand.brand_id : brand_id,
        !description ? item[0].item_description : description,
        !price ? item[0].price : price,
        !image_id ? item[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Patch successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `Item not found` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
export const deleteItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await getAItemFilteredByIdQuery(id);

    if (item.length > 0) {
      await deleteAItemQuery(id);

      await deleteAImageQuery(item[0].image.image_id);

      await deleteImage(id, "items");

      res.status(201).json({
        status: 201,
        message: `Delete successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: `Item not found` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
