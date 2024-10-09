// Conversion model for places
export const convertRowToPlaceModel = (row) => ({
  place_id: row.place_id,
  lat: row.lat,
  lng: row.lng,
  label: row.label,
  name: row.place_name,
  address: row.address,
  link: row.link,
  user: {
    user_id: row.user_id,
    username: row.user_username,
  },
});
