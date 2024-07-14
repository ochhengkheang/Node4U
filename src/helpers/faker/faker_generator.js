import { faker } from "@faker-js/faker";
import { customPgException } from "../exception.js";
import { pool } from "../../database/pg_pool.js";

export function createRandomCategories() {
  return {
    name: faker.word.noun(),
    description: faker.word.noun(),
  };
}

export const insertToCategoryQuery = async (categories) => {
  let client;
  try {
    client = await pool.connect();
    for (let category of categories) {
      const result = await client.query(
        "insert into categories (name, description) values ($1, $2) returning *;",
        [category.name, category.description]
      );
      console.log("Fake category data is inserted to database sucessfuly.");
    }
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};

export function createRandomUsers() {
  return {
    name: faker.word.noun(),
    email: faker.internet.email(),
    image_id: null,
  };
}

export const insertToUserQuery = async (users) => {
  let client;
  try {
    client = await pool.connect();
    for (let user of users) {
      const result = await client.query(
        "insert into users (name, email, image_id) values ($1, $2, $3) returning *;",
        [user.name, user.email, user.image_id]
      );
      console.log("Fake user data is inserted to database sucessfuly.");
    }
  } catch (error) {
    throw customPgException(error);
  } finally {
    if (client) client.release();
  }
};
