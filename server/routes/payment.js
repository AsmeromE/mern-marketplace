import express from "express";
import {
  initializePayment,
  verifyPayment,
} from "../controllers/paymentController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/initialize", auth, initializePayment);
router.get("/verify", auth, verifyPayment);

export default router;
