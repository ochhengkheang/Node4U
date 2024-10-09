export const convertRowToCategoryModel = (row) => ({
  category_id: row.category_id,
  category_name: row.category_name,
  category_description: row.category_description,
  image: {
    image_id: row.category_image_id,
    image_url: row.category_image_url,
  },
});
