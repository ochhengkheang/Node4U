// Conversion model for brands
export const convertRowToBrandModel = (row) => ({
  brand_id: row.brand_id,
  brand_name: row.brand_name,
  brand_description: row.brand_description,
  image: {
    image_id: row.brand_image_id,
    image_url: row.brand_image_url,
  },
  category: {
    category_id: row.category_id,
    category_name: row.category_name,
    category_description: row.category_description,
  },
});
