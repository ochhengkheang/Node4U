import express from "express";
import morgan from "morgan";
import { employeeRoute } from "./src/routes/employee_route.js";
import { itemRoute } from "./src/routes/item_route.js";
import { categoryRoute } from "./src/routes/category_route.js";
import { homeRoutes } from "./src/routes/home_route.js";
import { searchRoute } from "./src/routes/search_route.js";
import flash from "connect-flash";
import session from "express-session";
import cors from "cors";
import { addressRoute } from "./src/routes/address_route.js";

export const app = express();

/// Flash
app.use(
  session({ secret: "secret key", resave: false, saveUninitialized: false })
);
app.use(flash());

/// Proxy for Getting Ip address
app.set("trust proxy", true);

/// Enable CORS
app.use(cors());

/// Template Engine
app.set("views", "./src/views");
app.set("view engine", "pug");

/// Cache and 304 status code
app.disable("etag");

/// Access static files in PUBLIC
app.use(express.static("./public"));

/// Morgans
app.use(morgan("dev"));

/// Parses json requests
app.use(express.json());

/// ROUTES
app.use("/", homeRoutes);
app.use("/emp", employeeRoute);
app.use("/category", categoryRoute);
app.use("/item", itemRoute);
app.use("/search", searchRoute);
app.use("/address", addressRoute);
app.use("/notFound", (req, res) => {
  return res.render("pages/404.pug", {
    message: req.flash("error"),
  });
});

// Last if every route not found
app.use((req, res) => {
  return res.redirect("/notFound");
});
