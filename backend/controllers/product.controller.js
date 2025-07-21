// controllers/product.controller.js

import Product from "../models/product.models.js";

// Add product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;
    const image = req.files?.map((file) => file.filename);

    if (
      !name ||
      !description ||
      !price ||
      !offerPrice ||
      !category ||
      !image ||
      image.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }

    await Product.create({
      name,
      description,
      price,
      offerPrice,
      category,
      image, // Save file names from uploads/
    });

    res.status(201).json({ message: "Product Added Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ products, success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ product, success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

// Change stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ product, success: true, message: "Stock updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};
