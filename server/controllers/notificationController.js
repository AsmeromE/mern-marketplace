import Notification from "../models/Notification.js";
import { io } from "../server.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
};

export const clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.user._id });
    res.status(200).json({ message: "Notifications cleared" });
  } catch (error) {
    console.error("Error clearing notifications:", error);
    res.status(500).json({ message: "Failed to clear notifications", error });
  }
};

export const addNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      userId: req.user._id,
      message: req.body.message,
    });

    io.emit("new-notification", notification);

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error adding notification:", error);
    res.status(500).json({ message: "Failed to add notification", error });
  }
};

// Mark notifications as read
export const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res
      .status(500)
      .json({ message: "Failed to mark notifications as read", error });
  }
};
