import { pool } from "../pg_pool.js";

export const deleteTables = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
        drop table if exists users CASCADE;
        drop table if exists tokens CASCADE;
        drop table if exists user_profiles CASCADE;
        drop table if exists employees CASCADE;
        drop table if exists categories CASCADE;
        drop table if exists brands CASCADE;
        drop table if exists items CASCADE;
        drop table if exists places CASCADE;
        drop table if exists images CASCADE;
    `;
    await client.query(queryText);
    console.info("Tables are deleted successfully.");
  } catch (error) {
    console.error("Error deleting tables.");
    console.error(error);
  } finally {
    client.release();
  }
};

deleteTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
