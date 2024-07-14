// Conversion model for places
export const convertRowToPlaceModel = (row) => ({
  place_id: row.place_id,
  lat: row.lat,
  lng: row.lng,
  label: row.label,
  name: row.place_name,
  address: row.address,
  link: row.link,
  image: {
    image_id: row.place_image_id,
    image_url: row.place_image_url,
  },
  user: {
    user_id: row.user_id,
    name: row.user_name,
    email: row.user_email,
    image: {
      image_id: row.user_image_id,
      image_url: row.user_image_url,
    },
  },
});
