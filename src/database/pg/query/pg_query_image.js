import { customPgException } from "../../../helpers/exception.js";
import { pool } from "../pg_pool.js";

export const postAImageQuery = async (image_url) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "insert into images (image_url) values ($1) returning *;",
      [image_url]
    );
    return result.rows;
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putAImageQuery = async (image_url, id) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "update images set image_url = $1 where id= $2 returning *;",
      [image_url, id]
    );
    return result.rows;
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteAImageQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();
    await client.query("delete from images where id = $1;", [id]);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
