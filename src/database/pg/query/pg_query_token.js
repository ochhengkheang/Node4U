import { customPgException } from "../../../helpers/exception.js";
import { pool } from "../pg_pool.js";

export const getATokenFilteredByIdQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `
        select *
        FROM tokens
        where id= $1;`,
      [id]
    );

    return result.rows;
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getATokenFilteredByRefreshToken = async (token) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `
        select *
        FROM tokens
        where refresh_token = $1;`,
      [token]
    );

    return result.rows;
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const postATokenQuery = async (access_token, refresh_token) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      "insert into tokens (access_token, refresh_token) values ($1, $2) returning *;",
      [access_token, refresh_token]
    );

    return result.rows;
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putATokenQuery = async (access_token, refresh_token, id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      "update tokens set access_token = $1, refresh_token = $2 where id= $3 returning *;",
      [access_token, refresh_token, id]
    );

    return result.rows;
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteATokenQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();

    await client.query("delete from tokens where id = $1;", [id]);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
