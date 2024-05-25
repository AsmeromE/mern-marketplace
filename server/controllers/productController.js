// controllers/productController.js
import Product from "../models/Product.js";

// Add a new product
export const addProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate("reviews");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, image } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category, image },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
