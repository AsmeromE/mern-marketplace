import express from "express";
import {
  addReview,
  getReviews,
  getAllReviews,
  deleteReview,
} from "../controllers/reviewController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:productId", auth, addReview);
router.get("/product/:productId", getReviews);
router.get("/admin", auth, getAllReviews);
router.delete("/:reviewId", auth, deleteReview);

export default router;
