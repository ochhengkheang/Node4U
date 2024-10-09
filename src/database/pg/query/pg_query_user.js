import { customPgException } from "../../../helpers/exception.js";
import { convertRowToUserModel } from "../query_parser/user_model.js";
import { pool } from "../pg_pool.js";

export const getAUserFilteredByIdQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `
        select
            users.id as user_id,
            users.username,
            users.password,
            tokens.id as token_id,
            tokens.access_token,
            tokens.refresh_token
        FROM users
        LEFT JOIN tokens ON users.token_id = tokens.id
        where users.id= $1;`,
      [id]
    );

    return result.rows.map(convertRowToUserModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getAUserFilteredByUsername = async (username) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      `
        select
            users.id as user_id,
            users.username,
            users.password,
            tokens.id as token_id,
            tokens.access_token,
            tokens.refresh_token
        FROM users
        LEFT JOIN tokens ON users.token_id = tokens.id
        where users.username = $1;`,
      [username]
    );

    return result.rows.map(convertRowToUserModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const postAUserQuery = async (username, password, token_id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      "insert into users (username, password, token_id) values ($1, $2, $3) returning *;",
      [username, password, token_id]
    );

    return result.rows;
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putAUserQuery = async (username, password, token_id, id) => {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(
      "update users set username= $1, password = $2, token_id = $3 where id= $4 returning *;",
      [username, password, token_id, id]
    );

    return result.rows;
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
