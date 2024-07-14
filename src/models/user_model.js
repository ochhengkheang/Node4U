export const convertRowToUserModel = (row) => ({
  user_id: row.user_id,
  name: row.user_name,
  email: row.user_email,
  image: {
    image_id: row.image_id,
    image_url: row.image_url,
  },
});
