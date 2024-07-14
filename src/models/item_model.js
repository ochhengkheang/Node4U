export const convertRowToItemModel = (row) => ({
  item_id: row.item_id,
  item_name: row.item_name,
  item_description: row.item_description,
  item_price: row.item_price,
  image: {
    image_id: row.item_image_id,
    image_url: row.item_image_url,
  },
  brand: {
    brand_id: row.brand_id,
    brand_name: row.brand_name,
    brand_description: row.brand_description,
    image: {
      image_id: row.brand_image_id,
      image_url: row.brand_image_url,
    },
  },
  category: {
    category_id: row.category_id,
    category_name: row.category_name,
    category_description: row.category_description,
  },
});
