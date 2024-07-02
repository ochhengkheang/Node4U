import express from "express";
import { getSearchController } from "../controllers/search_controller.js";

export const searchRoute = express.Router();

searchRoute.route("/").get(getSearchController);
