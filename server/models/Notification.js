// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
