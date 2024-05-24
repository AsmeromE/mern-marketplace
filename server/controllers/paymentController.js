import dotenv from "dotenv";
import pkg from "chapa";
import Order from "../models/Order.js";
const { initialize } = pkg;

dotenv.config();

export const initializePayment = async (req, res) => {
  const { amount, products } = req.body;
  const tx_ref = `txn_${Math.floor(Math.random() * 1000000)}`;
  const callback_url = "http://localhost:5173/order-confirmation";

  try {
    const response = await fetch(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_AUTH_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
          tx_ref,
          return_url: "http://localhost:5173/order-history",
        }),
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      // Create a pending order
      const newOrder = new Order({
        userId: req.session.userId,
        products,
        tx_ref,
        totalAmount: amount,
        status: "pending",
      });

      await newOrder.save();

      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "Payment initialization failed" });
    }
  } catch (error) {
    console.error("Chapa payment error:", error);
    res.status(500).json({ message: "Payment failed", error });
  }
};

export const verifyPayment = async (req, res) => {
  const { tx_ref } = req.query;

  try {
    const response = await chapa.verify(tx_ref);
    if (response.status === "success") {
      const order = await Order.findOneAndUpdate(
        { tx_ref },
        { status: "completed" },
        { new: true }
      );
      res.status(200).json({ message: "Payment verified successfully", order });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
