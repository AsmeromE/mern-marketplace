import Cart from "../models/Cart.js";

// Add item to cart
export const addItemToCart = async (req, res) => {
  console.log(req);
  const { productId, quantity } = req.body;
  try {
    const userId = req.session.userId;
    const token = req.session.token;
    if (!userId || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    } else {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart", error });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    const token = req.session.token;
    if (!userId || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const userId = req.session.userId;
    const token = req.session.token;
    if (!userId || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.products = cart.products.filter(
        (p) => p.productId.toString() !== productId
      );
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Failed to remove item from cart", error });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Cart.deleteMany({ userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to clear cart", error: err.message });
  }
};
