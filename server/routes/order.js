import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createOrder);
router.get("/", auth, getUserOrders);
router.get("/admin/orders", auth, getAllOrders);

export default router;
