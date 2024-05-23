import express from "express";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addItemToCart);
router.post("/remove", auth, removeItemFromCart);
router.post("/update", auth, updateItemQuantity);
router.post("/clear", auth, clearCart);

export default router;
