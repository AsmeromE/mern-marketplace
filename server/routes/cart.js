import express from "express";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addItemToCart);
router.post("/remove", auth, removeItemFromCart);
router.post("/clear", auth, clearCart);

export default router;
