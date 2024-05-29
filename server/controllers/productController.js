import Product from "../models/Product.js";
import Notification from "../models/Notification.js";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    // Create a new notification
    const notification = new Notification({
      user: req.user.id,
      message: `New product added: ${product.name}`,
      product: product._id,
    });
    await notification.save();

    const io = req.app.get("io");
    io.emit("notification", { message: "New product added", product });

    res.status(201).json(product);
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

// Update an existing product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, image } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category, image },
      { new: true }
    );

    // Create a new notification
    const notification = new Notification({
      user: req.user.id,
      message: `${updatedProduct.name} edited`,
      product: updatedProduct._id,
    });
    await notification.save();
    const io = req.app.get("io");
    io.emit("notification", {
      message: "Product edited",
      product: updatedProduct,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    console.log(product);

    // Create a new notification
    const notification = new Notification({
      user: req.user.id,
      message: `Product deleted: ${product.name}`,
      product: product._id,
    });
    await notification.save();

    const io = req.app.get("io");
    io.emit("notification", { message: "Product deleted", product });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
