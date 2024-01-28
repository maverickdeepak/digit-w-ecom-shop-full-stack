import express from "express";
const routes = express.Router();

import {
  get_products,
  get_product_by_id,
} from "../controllers/product_controller.js";

routes.get("/", get_products);

routes.get("/:id", get_product_by_id);

export default routes;
