import axios from "axios";
import { config } from "../config/config.js";

export const getSearchController = async (req, res) => {
  const { name, category_id } = req.query;

  try {
    const categoriesResponse = await axios.get(`${config.baseUrl}/category/`);

    const categories = categoriesResponse.data;
    if (!categories) throw new Error("Cannot get Category");
    // console.log(categories);

    const itemsResponse = !category_id
      ? await axios.get(`${config.baseUrl}/item?name=${name}`)
      : await axios.get(
          `${config.baseUrl}/item?category_id=${encodeURIComponent(category_id)}&name=${name}`
        );

    const items = itemsResponse.data;
    if (!items) throw new Error("Cannot get items");
    // console.log(category_id);

    res.render("pages/search.pug", {
      title: `${name} - Search`,
      name,
      category_id,
      categories,
      items,
    });
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/notFound");
  }
};
