import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET all products (with optional category filtering)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "all") {
      query.category = category.toLowerCase();
    }
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// GET single product by custom id or _id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ $or: [{ id: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error: error.message });
  }
});

export default router;
