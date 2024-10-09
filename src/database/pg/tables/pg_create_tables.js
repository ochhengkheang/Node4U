import { pool } from "../pg_pool.js";

export const createTables = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
        CREATE TABLE IF NOT EXISTS images (
            id serial primary key,
            image_url TEXT not null
        );
        CREATE TABLE IF NOT EXISTS tokens(
          id SERIAL PRIMARY KEY,
          access_token text,
          refresh_token text
        );
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE not null,
            password VARCHAR(100) NOT NULL,
            token_id integer references tokens(id) on delete cascade
        );
        CREATE TABLE IF NOT EXISTS user_profiles(
            user_id INTEGER PRIMARY KEY REFERENCES users(id) on delete cascade,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            address TEXT,
            phone TEXT,
            image_id integer references images(id) on delete set null
        );
        CREATE TABLE IF NOT EXISTS employees(
            id SERIAL PRIMARY KEY,
            user_id integer references users(id) on delete cascade,
            name varchar(100) not null,
            dob timestamp,
            email varchar(100) unique not null,
            address text,
            phone text,
            image_id integer references images(id) on delete set null
        );
        CREATE TABLE IF NOT EXISTS categories(
            id SERIAL PRIMARY KEY,
            name varchar(100) unique,
            description text,
            image_id integer references images(id) on delete set null
        );
        CREATE TABLE IF NOT EXISTS brands(
            id SERIAL PRIMARY KEY,
            category_id integer references categories(id) on delete cascade,
            name varchar(100) unique,
            description text,
            image_id integer references images(id) on delete set null
        );
        CREATE TABLE IF NOT EXISTS items(
            id SERIAL PRIMARY KEY,
            brand_id integer references brands(id) on delete cascade,
            category_id integer references categories(id) on delete cascade,
            name varchar(100) unique not null,
            description text,
            price decimal(10, 2),
            image_id integer references images(id) on delete cascade
        );
        CREATE TABLE IF NOT EXISTS places (
            place_id VARCHAR(100) PRIMARY KEY,
            user_id INTEGER references users(id) on delete cascade,
            lat DECIMAL(20, 17),
            lng DECIMAL(20, 17),
            label varchar(100),
            name TEXT,
            address TEXT,
            link TEXT,
            image_id integer references images(id) on delete set null
        );
    `;
    await client.query(queryText);
    console.info("Tables are created successfully");
  } catch (error) {
    console.error("Error creating tables.");
    console.error(error);
  } finally {
    client.release();
  }
};

createTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
