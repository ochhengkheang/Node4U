import axios from "axios";

export const getSearchController = async (req, res) => {
  const nameQuery = req.query.query;
  const categoryQuery = req.query.category;

  try {
    const categoriesResponse = await axios.get(
      "http://localhost:3000/category/"
    );
    const categories = categoriesResponse.data;
    if (!categories) throw new Error("Cannot get Category");

    const itemsResponse =
      categoryQuery == ""
        ? await axios.get(`http://localhost:3000/item?name=${nameQuery}`)
        : await axios.get(
            `http://localhost:3000/item?category=${encodeURIComponent(categoryQuery)}&name=${nameQuery}`
          );
    const items = itemsResponse.data;
    if (!items) throw new Error("Cannot get items");

    res.render("pages/search.pug", {
      title: `${nameQuery} - Search`,
      nameQuery,
      categoryQuery,
      categories,
      items,
    });
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/notFound");
  }
};
