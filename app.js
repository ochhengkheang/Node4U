import { employeeRoute } from "./src/routes/employee_route.js";
import { itemRoute } from "./src/routes/item_route.js";
import { categoryRoute } from "./src/routes/category_route.js";
import { homeRoutes } from "./src/routes/home_route.js";
import { searchRoute } from "./src/routes/search_route.js";
import { validateJson } from "./src/middlewares/json_validate.js";
import { placeRoute } from "./src/routes/place_route.js";
import { userRoute } from "./src/routes/user_route.js";
import { brandRoute } from "./src/routes/brand_route.js";
import { imageRoute } from "./src/routes/images_route.js";
import { authRoute } from "./src/routes/auth_route.js";
import { config, isProduction } from "./src/config/config.js";

import RateLimitRedis from "rate-limit-redis";
import flash from "connect-flash";
import cors from "cors";
import favicon from "serve-favicon";
import cookieSession from "cookie-session";
import sanitizer from "perfect-express-sanitizer";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import express from "express";
import morgan from "morgan";
import { limiter } from "./src/middlewares/limiter.js";

export const app = express();

/// Access static files in PUBLIC
app.use(express.static("./public"));

/// Sessions
app.use(
  cookieSession({
    name: "session",
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);

// Serve your favicon using serve-favicon middleware
app.use(favicon("./public/images/icons8-plant-32.png"));

// Middleware to generate a nonce for each request
// Nonce: Support Content Security Policies (CSP) by specifying a cryptographic "number used once"
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("base64");
  next();
});

// Secure Express apps by setting HTTP response headers.
app.use((req, res, next) => {
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://unpkg.com/",
          "'nonce-" + res.locals.nonce + "'", // Prevent violates the following content security policy directive 'unsafe-inline' keyword
        ],
        imgSrc: ["'self'", "https://res.cloudinary.com/dqp220tpk/"],
      },
    },
    frameguard: {
      action: "deny",
    },
    referrerPolicy: {
      policy: "no-referrer", // If a user navigates to another website, the Referer header will not be sent.
    },
  });
  next();
});

/// Rate limiter
app.use(limiter);

/// Proxy for Getting Ip address
app.set("trust proxy", config.mainConfig.trustProxy);

/// Parse json requests
app.use(express.json({ limit: "10kb" }));

/// Parse Cookie
app.use(cookieParser());

// Sanitizer to prevent harmful malicious actions
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    level: 5,
    whitelist: [],
    only: ["body", "query"], // if not specify, it will sanitize special characters on body and query
  })
);

// Flash
app.use(flash());

/// Enable CORS
app.use(cors({}));

/// Template Engine
app.set("views", "./src/views");
app.set("view engine", "pug");

/// Cache and 304 status code
app.disable("etag");

/// Morgans
if (!isProduction) app.use(morgan("dev"));

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
app.use("/auth", authRoute);

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

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
