import express from "express";
import { getHomeController } from "../controllers/home_controller.js";

export const homeRoutes = express.Router();

homeRoutes.route("/").get(getHomeController);
