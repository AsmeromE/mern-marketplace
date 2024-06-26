import express from "express";
import {
  getNotifications,
  clearNotifications,
  addNotification,
  markNotificationsAsRead,
  markAsRead,
} from "../controllers/notificationController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getNotifications);
router.post("/clear", auth, clearNotifications);
router.post("/add", auth, addNotification);
router.put("/mark-as-read", auth, markNotificationsAsRead);
router.put("/:notificationId/read", auth, markAsRead);

export default router;
