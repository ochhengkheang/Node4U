import { pool } from "../pg_pool.js";
import { customPgException } from "../../../helpers/exception.js";
import { convertRowToPlaceModel } from "../query_parser/place_model.js";

export const getAPlaceFilteredByIdQuery = async (place_id) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `select
          places.place_id,
          places.lat,
          places.lng,
          places.label,
          places.name AS place_name,
          places.address,
          places.link,
          users.id AS user_id,
          users.username AS user_username
        FROM places
        LEFT JOIN users ON places.user_id = users.id
        where place_id= $1;`,
      [place_id]
    );

    return result.rows.map(convertRowToPlaceModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getPlacesFilteredAutoQuery = async (
  user_id,
  name,
  label,
  address,
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
      places.place_id,
      places.lat,
      places.lng,
      places.label,
      places.name AS place_name,
      places.address,
      places.link,
      users.id AS user_id,
      users.username AS user_username
    FROM places
    LEFT JOIN users ON places.user_id = users.id
    WHERE 1=1`;

    const values = [];

    // Dynamically append conditions
    if (user_id) {
      values.push(`%${user_id}%`);
      query += ` AND users.id = $${values.length}`;
    }

    if (name) {
      values.push(`%${name}%`);
      query += ` AND places.name ILIKE $${values.length}`;
    }

    if (label) {
      values.push(`%${label}%`);
      query += ` AND places.label ILIKE $${values.length}`;
    }

    if (address) {
      values.push(`%${address}%`);
      query += ` AND places.address ILIKE $${values.length}`;
    }

    values.push(limit);
    query += ` limit $${values.length}`;

    values.push(offset);
    query += ` offset $${values.length}`;

    const result = await client.query(query, values);

    return {
      places: result.rows.map(convertRowToPlaceModel),
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

export const postAPlaceQuery = async (
  user_id,
  place_id,
  lat,
  lng,
  label,
  name,
  address,
  link,
  image_id = null
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "insert into places (user_id, place_id, lat, lng, label, name, address, link, image_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *;",
      [user_id, place_id, lat, lng, label, name, address, link, image_id]
    );

    return result.rows.map(convertRowToPlaceModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putAPlaceQuery = async (
  lat,
  lng,
  label,
  name,
  address,
  link,
  image_id,
  place_id,
  user_id
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "update places set lat= $1, lng = $2, label= $3, name = $4, address= $5, link = $6, image_id = $7 where place_id= $8 and user_id = $9 returning *;",
      [lat, lng, label, name, address, link, image_id, place_id, user_id]
    );

    return result.rows.map(convertRowToPlaceModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteAPlaceQuery = async (place_id, user_id) => {
  let client;
  try {
    client = await pool.connect();

    await client.query(
      "delete from places where place_id = $1 and user_id = $2",
      [place_id, user_id]
    );
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
