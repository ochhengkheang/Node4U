import {
  deleteABrandQuery,
  getABrandFilteredByIdQuery,
  getBrandsFilteredAutoQuery,
  postABrandQuery,
  putABrandQuery,
} from "../database/pg/query/pg_query_brand.js";
import { deleteAImageQuery } from "../database/pg/query/pg_query_image.js";
import { deleteImage } from "../helpers/cloudinary.js";

export const getBrandController = async (req, res) => {
  try {
    const { category_id, name, description, offset, limit } = req.query;

    const brands = await getBrandsFilteredAutoQuery(
      category_id,
      name,
      description,
      offset,
      limit
    );

    return res.status(200).json(brands);
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const getBrandByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await getABrandFilteredByIdQuery(id);

    if (brand.length > 0) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ status: 404, message: "Brand not found" });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postBrandController = async (req, res) => {
  try {
    const { category_id, name, description, image_id } = req.body;

    await postABrandQuery(category_id, name, description, image_id);

    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const putBrandByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { category_id, name, description, image_id } = req.body;

    const brand = await getABrandFilteredByIdQuery(id);

    if (brand.length > 0) {
      await putABrandQuery(
        category_id,
        name,
        description,
        !image_id ? brand[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Update successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: "Brand not found" });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const patchBrandByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { category_id, name, description, image_id } = req.body;

    const brand = await getABrandFilteredByIdQuery(id);

    if (brand.length > 0) {
      await putABrandQuery(
        !category_id ? brand[0].category.category_id : category_id,
        !name ? brand[0].brand_name : name,
        !description ? brand[0].brand_description : description,
        !image_id ? brand[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Patch successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: "Brand not found" });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const deleteBrandByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await getABrandFilteredByIdQuery(id);

    if (brand.length > 0) {
      await deleteABrandQuery(id);

      await deleteAImageQuery(brand[0].image.image_id);

      await deleteImage(id, "brands");

      res.status(201).json({
        status: 201,
        message: `Delete successfully.`,
      });
    } else {
      res.status(404).json({ status: 404, message: "Brand not found" });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
