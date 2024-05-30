// controllers/orderController.js
import Order from "../models/Order.js";
import Notification from "../models/Notification.js";

// Create a new order
export const createOrder = async (req, res) => {
  const { tx_ref, totalAmount, products } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newOrder = new Order({
      userId,
      products,
      tx_ref,
      totalAmount,
      status: "pending",
    });

    await newOrder.save();

    // Create a new notification
    const notification = new Notification({
      user: userId,
      message: `Order placed: ${newOrder.tx_ref}`,
      order: newOrder._id,
    });
    await notification.save();

    const io = req.app.get("io");
    io.emit("notification", {
      message: `Order placed: ${newOrder.tx_ref}`,
      order: newOrder,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    // Create a notification for the order status update
    const notification = new Notification({
      user: order.userId,
      message: `Your order ${order.tx_ref} is now ${status}.`,
      order: order._id,
    });
    await notification.save();

    const io = req.app.get("io");
    io.emit("notification", {
      message: `Order ${order.tx_ref} status updated to ${status}`,
      order,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

// Fetch orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ userId }).populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Fetch all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
