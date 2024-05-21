import express from "express";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import {
  getUsers,
  deleteUser,
  getUserStats,
  editUser,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", [auth, admin], getUsers);
router.post("/users", [auth, admin], createUser);
router.delete("/users/:id", [auth, admin], deleteUser);
router.get("/user-stats", [auth, admin], getUserStats);
router.put("/users/:id", [auth, admin], editUser);

export default router;
