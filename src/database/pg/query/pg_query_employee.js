import { convertRowToEmployeeModel } from "../query_parser/employee_model.js";
import { pool } from "../pg_pool.js";
import { customPgException } from "../../../helpers/exception.js";

export const getAEmployeeFilteredByIdQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT
          employees.id AS employee_id,
          employees.name AS employee_name,
          employees.dob,
          employees.email AS employee_email,
          employees.address,
          employees.phone,
          employee_images.id AS employee_image_id,
          employee_images.image_url AS employee_image_url,
          users.id AS user_id,
          users.name AS user_name,
          users.email AS user_email,
          user_images.id AS user_image_id,
          user_images.image_url AS user_image_url
      FROM employees
      INNER JOIN users ON employees.user_id = users.id
      LEFT JOIN images AS employee_images ON employees.image_id = employee_images.id
      LEFT JOIN images AS user_images ON users.image_id = user_images.id
      where employees.id = $1`,
      [id]
    );

    return result.rows.map(convertRowToEmployeeModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const getEmployeesFilteredAutoQuery = async (
  user_id,
  name,
  from,
  to,
  email,
  address,
  phone,
  offset = 0,
  limit
) => {
  let client;
  try {
    client = await pool.connect();

    const queryResult = await client.query(
      "select count(*) as total from employees;"
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
      employees.id AS employee_id,
      employees.name AS employee_name,
      employees.dob,
      employees.email AS employee_email,
      employees.address,
      employees.phone,
      employee_images.id AS employee_image_id,
      employee_images.image_url AS employee_image_url,
      users.id AS user_id,
      users.name AS user_name,
      users.email AS user_email,
      user_images.id AS user_image_id,
      user_images.image_url AS user_image_url
    FROM employees
    INNER JOIN users ON employees.user_id = users.id
    LEFT JOIN images AS employee_images ON employees.image_id = employee_images.id
    LEFT JOIN images AS user_images ON users.image_id = user_images.id
    where 1=1`;

    const values = [];

    // Dynamically append conditions
    if (user_id) {
      values.push(user_id);
      query += ` and users.id = $${values.length}`;
    }

    if (name) {
      values.push(`%${name}%`);
      query += ` and employees.name ILIKE $${values.length}`;
    }

    if (email) {
      values.push(`%${email}%`);
      query += ` and employees.email ILIKE $${values.length}`;
    }

    if (address) {
      values.push(`%${address}%`);
      query += ` and employees.address ILIKE $${values.length}`;
    }

    if (phone) {
      values.push(`%${phone}%`);
      query += ` and employees.phone ILIKE $${values.length}`;
    }

    if (from && to) {
      values.push(from);
      query += ` and employees.dob between $${values.length}`;
      values.push(to);
      query += ` and $${values.length}`;
    }

    values.push(limit);
    query += ` limit $${values.length}`;

    values.push(offset);
    query += ` offset $${values.length}`;

    const result = await client.query(query, values);

    return {
      employees: result.rows.map(convertRowToEmployeeModel),
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

export const postAEmployeeQuery = async (
  user_id,
  name,
  dob,
  email,
  address,
  phone,
  image_id = null
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "insert into employees (user_id, name, dob, email, address, phone, image_id) values ($1, $2, $3, $4, $5, $6, $7) returning *;",
      [user_id, name, dob, email, address, phone, image_id]
    );

    return result.rows.map(convertRowToEmployeeModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const putAEmployeeQuery = async (
  user_id,
  name,
  dob,
  email,
  address,
  phone,
  image_id,
  id
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "update employees set user_id = $1, name = $2, dob = $3, email= $4, address = $5, phone = $6, image_id = $7 where id= $8 returning *;",
      [user_id, name, dob, email, address, phone, image_id, id]
    );

    return result.rows.map(convertRowToEmployeeModel);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export const deleteAEmployeeQuery = async (id) => {
  let client;
  try {
    client = await pool.connect();
    await client.query("delete from employees where id = $1;", [id]);
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
