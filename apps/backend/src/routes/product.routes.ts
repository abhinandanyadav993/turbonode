import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  findProductsByTitle,
  findProductsByTags,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

import express from "express";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/search/title/:name", findProductsByTitle);
productRouter.get("/search/tags/:name", findProductsByTags);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
