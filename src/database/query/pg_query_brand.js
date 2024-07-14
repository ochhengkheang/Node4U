import { pool } from "../pg_pool.js";
import { customPgException } from "../../helpers/exception.js";
import { convertRowToBrandModel } from "../../models/brand_model.js";

export const getABrandFilteredByIdQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `
      select
        brands.id AS brand_id,
        brands.name AS brand_name,
        brands.description AS brand_description,
        brand_images.id AS brand_image_id,
        brand_images.image_url AS brand_image_url,
        categories.id AS category_id,
        categories.name AS category_name,
        categories.description AS category_description
      FROM brands
      INNER JOIN categories ON brands.category_id = categories.id
      LEFT JOIN images AS brand_images ON brands.image_id = brand_images.id
      where brands.id= $1;`,
      [id]
    );

    return result.rows.map(convertRowToBrandModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getBrandsFilteredAutoQuery = async (
  category_id,
  name,
  description,
  offset = 0,
  limit
) => {
  let client;
  try {
    client = await pool.connect();

    const queryResult = await client.query(
      "select count(*) as total from brands;"
    );

    const size = parseInt(queryResult.rows[0].total, 10);

    if (!limit) limit = size;

    const totalPages = Math.ceil(size / limit);
    const page = Math.floor(offset / limit) + 1;

    // Calculate next and previous pages
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    // Base query
    let query = `
    SELECT
      brands.id AS brand_id,
        brands.name AS brand_name,
        brands.description AS brand_description,
        brand_images.id AS brand_image_id,
        brand_images.image_url AS brand_image_url,
        categories.id AS category_id,
        categories.name AS category_name,
        categories.description AS category_description
      FROM brands
      INNER JOIN categories ON brands.category_id = categories.id
      LEFT JOIN images AS brand_images ON brands.image_id = brand_images.id
    WHERE 1=1`;

    const values = [];

    // Dynamically append conditions
    if (category_id) {
      values.push(category_id);
      query += ` AND categories.id = $${values.length}`;
    }
    if (name) {
      values.push(`%${name}%`);
      query += ` AND brands.name ILIKE $${values.length}`;
    }
    if (description) {
      values.push(`%${description}%`);
      query += ` AND brands.description ILIKE $${values.length}`;
    }

    values.push(limit);
    query += ` limit $${values.length}`;

    values.push(offset);
    query += ` offset $${values.length}`;

    const result = await client.query(query, values);

    return {
      brand: result.rows.map(convertRowToBrandModel),
      meta: {
        totalPages: totalPages,
        offset: offset,
        limit: limit,
        page: page,
        size: size,
        previous: previousPage,
        next: nextPage,
      },
    };
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const postABrandQuery = async (
  category_id,
  name,
  description,
  image_id = null
) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      "insert into brands (category_id, name, description, image_id) values ($1, $2, $3, $4) returning *;",
      [category_id, name, description, image_id]
    );

    return result.rows.map(convertRowToBrandModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putABrandQuery = async (
  category_id,
  name,
  description,
  image_id,
  id
) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      "update brands set category_id= $1, name = $2, description = $3, image_id= $4 where id= $5 returning *;",
      [category_id, name, description, image_id, id]
    );

    return result.rows.map(convertRowToBrandModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteABrandQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();

    await client.query("delete from brands where id = $1;", [id]);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
