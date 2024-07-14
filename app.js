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
import { validateJson } from "./src/middlewares/json_validate.js";
import { placeRoute } from "./src/routes/place_route.js";
import { userRoute } from "./src/routes/user_route.js";
import { brandRoute } from "./src/routes/brand_route.js";
import { imageRoute } from "./src/routes/images_route.js";
import favicon from "serve-favicon";

export const app = express();

/// Access static files in PUBLIC
app.use(express.static("./public"));

/// Flash
app.use(
  session({ secret: "secret key", resave: false, saveUninitialized: false })
);
app.use(flash());

// Serve your favicon using serve-favicon middleware
app.use(favicon("./public/images/icons8-plant-32.png"));

/// Proxy for Getting Ip address
app.set("trust proxy", true);

/// Enable CORS
app.use(cors());

/// Template Engine
app.set("views", "./src/views");
app.set("view engine", "pug");

/// Cache and 304 status code
app.disable("etag");

/// Parses json requests
app.use(express.json());

/// Morgans
app.use(morgan("dev"));

/// Middleware to handle json syntax error
app.use(validateJson);

/// Handle form submissions and other URL-encoded data
app.use(express.urlencoded({ extended: true }));

/// ROUTES
app.use("/", homeRoutes);
app.use("/emp", employeeRoute);
app.use("/category", categoryRoute);
app.use("/item", itemRoute);
app.use("/brand", brandRoute);
app.use("/search", searchRoute);
app.use("/place", placeRoute);
app.use("/user", userRoute);
app.use("/image", imageRoute);

/// Redirect
app.use("/notFound", (req, res) => {
  return res.render("pages/404.pug", {
    message: req.flash("error"),
  });
});

// Last if every route not found
app.use((req, res) => {
  return res.redirect("/notFound");
});
