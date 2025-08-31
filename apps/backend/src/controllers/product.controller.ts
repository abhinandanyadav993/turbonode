import { Request, Response } from "express";
import Product from "../models/product.model"; // Ensure default import for mongoose model
import { IProduct } from "@mhs/shared";

// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

// Find products by name (case-insensitive, partial match)
export const findProductsByTitle = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const products = await Product.find({
      title: { $regex: name, $options: "i" },
    }).lean();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to search products", error });
  }
};

// Find products by tags (case-insensitive, partial match)
export const findProductsByTags = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const products = await Product.find({
      tags: { $elemMatch: { $regex: name, $options: "i" } },
    }).lean();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to search products", error });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const payload: IProduct = req.body;
    const newProduct = await Product.create(payload);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to create product", error });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    ).lean();
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
