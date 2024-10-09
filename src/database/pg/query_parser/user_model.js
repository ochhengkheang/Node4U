export const convertRowToUserModel = (row) => ({
  user_id: row.user_id,
  username: row.username,
  password: row.password,
  token: {
    token_id: row.token_id,
    access_token: row.access_token,
    refresh_token: row.refresh_token,
  },
});
