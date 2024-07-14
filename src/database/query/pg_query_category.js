import { pool } from "../pg_pool.js";
import { customPgException } from "../../helpers/exception.js";
import { convertRowToCategoryModel } from "../../models/category_model.js";

export const getACategoryFilteredByIdQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `SELECT
        categories.id AS category_id,
        categories.name AS category_name,
        categories.description AS category_description,
        images.id AS category_image_id,
        images.image_url AS category_image_url
      FROM categories
      LEFT JOIN images ON categories.image_id = images.id
      where categories.id = $1`,
      [id]
    );
    return result.rows.map(convertRowToCategoryModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getCategoriesFilteredAutoQuery = async (
  name,
  description,
  offset = 0,
  limit
) => {
  let client;
  try {
    client = await pool.connect();

    const queryResult = await client.query(
      "select count(*) as total from categories;"
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
        categories.id AS category_id,
        categories.name AS category_name,
        categories.description AS category_description,
        images.id AS category_image_id,
        images.image_url AS category_image_url
      FROM categories
      LEFT JOIN images ON categories.image_id = images.id
      where 1=1`;

    const values = [];

    // Dynamically append conditions
    if (name) {
      values.push(`%${name}%`);
      query += ` and categories.name ILIKE $${values.length}`;
    }

    if (description) {
      values.push(`%${description}%`);
      query += ` and categories.description ILIKE $${values.length}`;
    }

    values.push(limit);
    query += ` limit $${values.length}`;

    values.push(offset);
    query += ` offset $${values.length}`;

    const result = await client.query(query, values);
    return {
      categories: result.rows.map(convertRowToCategoryModel),
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

export const postACategoryQuery = async (
  name,
  description,
  image_id = null
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "insert into categories (name, description, image_id) values ($1, $2, $3) returning *;",
      [name, description, image_id]
    );
    return result.rows.map(convertRowToCategoryModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putACategoryQuery = async (name, description, image_id, id) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "update categories set name = $1, description= $2, image_id = $3 where id= $4 returning *;",
      [name, description, image_id, id]
    );
    return result.rows.map(convertRowToCategoryModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteACategoryQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();
    await client.query("delete from categories where id = $1;", [id]);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
