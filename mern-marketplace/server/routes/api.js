import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";
import { validateUser } from "../validators/userValidator.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is working");
});

router.post("/users", validateUser, createUser);
router.get("/users", getUsers);

export default router;
