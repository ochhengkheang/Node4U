import { pool } from "../pg_pool.js";
import { customPgException } from "../../helpers/exception.js";
import { convertRowToUserModel } from "../../models/user_model.js";

export const getAUserFilteredByIdQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `
      SELECT
        users.id AS user_id,
        users.name AS user_name,
        users.email AS user_email,
        images.id AS image_id,
        images.image_url AS image_url
      FROM users
      LEFT JOIN images ON users.image_id = images.id
      where users.id = $1`,
      [id]
    );

    return result.rows.map(convertRowToUserModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getUsersFilteredAutoQuery = async (
  name,
  email,
  offset = 0,
  limit
) => {
  let client;
  try {
    client = await pool.connect();

    const queryResult = await client.query(
      "select count(*) as total from places;"
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
      users.id AS user_id,
      users.name AS user_name,
      users.email AS user_email,
      images.id AS image_id,
      images.image_url AS image_url
    FROM users
    LEFT JOIN images ON users.image_id = images.id
    where 1=1`;

    const values = [];

    // Dynamically append conditions
    if (name) {
      values.push(`%${name}%`);
      query += ` and users.name ILIKE $${values.length}`;
    }

    if (email) {
      values.push(`%${email}%`);
      query += ` and users.email ILIKE $${values.length}`;
    }

    values.push(limit);
    query += ` limit $${values.length}`;

    values.push(offset);
    query += ` offset $${values.length}`;

    const result = await client.query(query, values);

    return {
      places: result.rows.map(convertRowToUserModel),
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

export const postAUserQuery = async (name, email, image_id = null) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "insert into users (name, email, image_id) values ($1, $2, $3) returning *;",
      [name, email, image_id]
    );

    return result.rows.map(convertRowToUserModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putAUserQuery = async (name, email, image_id, id) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "update users set name = $1, email= $2, image_id = $3 where id= $4 returning *;",
      [name, email, image_id, id]
    );

    return result.rows.map(convertRowToUserModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteAUserQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();
    await client.query("delete from users where id = $1;", [id]);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
