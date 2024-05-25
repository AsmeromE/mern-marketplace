// routes/productRoutes.js
import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, addProduct);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId", auth, updateProduct);
router.delete("/:productId", auth, deleteProduct);

export default router;
