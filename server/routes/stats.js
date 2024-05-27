import express from "express";
import { getUserStats, getSalesData } from "../controllers/statsController.js";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.get("/user-stats", auth, admin, getUserStats);
router.get("/sales", auth, admin, getSalesData);

export default router;
