export const getHomeController = async (req, res) => {
  try {
    // Fetch data from the home path (categories endpoint)
    const categoriesResponse = await fetch("http://localhost:3000/category/");
    const categories = await categoriesResponse.json();
    // console.log(categories);

    const itemsResponse = await fetch("http://localhost:3000/item/");
    const items = await itemsResponse.json();
    // console.log(items);

    res.render("pages/index.pug", { title: "Home", categories, items });
  } catch (error) {
    // console.error("error:", error.message);
    req.flash("error", error.message);
    return res.redirect("/notFound");
  }
};
