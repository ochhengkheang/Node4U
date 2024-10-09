import { pool } from "../pg_pool.js";
import { customPgException } from "../../../helpers/exception.js";
import { convertRowToItemModel } from "../query_parser/item_model.js";

export const getAItemFilteredByIdQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `
      SELECT
        items.id AS item_id,
        items.name AS item_name,
        items.description AS item_description,
        items.price AS item_price,
        item_images.id AS item_image_id,
        item_images.image_url AS item_image_url,
        brands.id AS brand_id,
        brands.name AS brand_name,
        brands.description AS brand_description,
        brand_images.id AS brand_image_id,
        brand_images.image_url AS brand_image_url,
        categories.id AS category_id,
        categories.name AS category_name,
        categories.description AS category_description
      FROM items
      INNER JOIN brands ON items.brand_id = brands.id
      INNER JOIN categories ON items.category_id = categories.id
      LEFT JOIN images AS item_images ON items.image_id = item_images.id
      LEFT JOIN images AS brand_images ON brands.image_id = brand_images.id
      where items.id = $1;`,
      [id]
    );
    return result.rows.map(convertRowToItemModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getItemsFilteredAutoQuery = async (
  name,
  category_id,
  brand_id,
  description,
  min_price,
  max_price,
  offset = 0,
  limit
) => {
  let client;
  try {
    client = await pool.connect();

    const queryResult = await client.query(
      "select count(*) as total from items;"
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
      items.id AS item_id,
      items.name AS item_name,
      items.description AS item_description,
      items.price AS item_price,
      item_images.id AS item_image_id,
      item_images.image_url AS item_image_url,
      brands.id AS brand_id,
      brands.name AS brand_name,
      brands.description AS brand_description,
      brand_images.id AS brand_image_id,
      brand_images.image_url AS brand_image_url,
      categories.id AS category_id,
      categories.name AS category_name,
      categories.description AS category_description
    FROM items
    INNER JOIN brands ON items.brand_id = brands.id
    INNER JOIN categories ON items.category_id = categories.id
    LEFT JOIN images AS item_images ON items.image_id = item_images.id
    LEFT JOIN images AS brand_images ON brands.image_id = brand_images.id
    WHERE 1=1`;
    const values = [];

    // Dynamically append conditions
    if (name) {
      values.push(`%${name}%`);
      query += ` AND items.name ILIKE $${values.length}`;
    }
    if (category_id) {
      values.push(category_id);
      query += ` AND categories.id  = $${values.length}`;
    }
    if (brand_id) {
      values.push(brand_id);
      query += ` AND brands.id = $${values.length}`;
    }
    if (description) {
      values.push(`%${description}%`);
      query += ` AND items.description ILIKE $${values.length}`;
    }
    if (min_price) {
      values.push(min_price);
      query += ` AND items.price >= $${values.length}`;
    }
    if (max_price) {
      values.push(max_price);
      query += ` AND items.price <= $${values.length}`;
    }

    values.push(limit);
    query += ` limit $${values.length}`;

    values.push(offset);
    query += ` offset $${values.length}`;

    const result = await client.query(query, values);

    return {
      items: result.rows.map(convertRowToItemModel),
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

export const postAItemQuery = async (
  name,
  category_id,
  brand_id,
  description,
  price,
  image_id = null
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "insert into items (name, category_id, brand_id, description, price, image_id) values ($1, $2, $3, $4, $5, $6) returning *;",
      [name, category_id, brand_id, description, price, image_id]
    );
    return result.rows.map(convertRowToItemModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putAItemQuery = async (
  name,
  category_id,
  brand_id,
  description,
  price,
  image_id,
  id
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "update items set name = $1, category_id= $2, brand_id = $3, description = $4, price= $5, image_id = $6 where id= $7 returning *;",
      [name, category_id, brand_id, description, price, image_id, id]
    );
    return result.rows.map(convertRowToItemModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteAItemQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();
    await client.query("delete from items where id = $1;", [id]);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
