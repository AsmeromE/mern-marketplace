import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

// Fetch Users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Create User
export const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  // Input validation
  await body("name").trim().notEmpty().withMessage("Name is required").run(req);
  await body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email")
    .run(req);
  await body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .run(req);
  await body("role").trim().notEmpty().withMessage("Role is required").run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

// Fetch User Stats
export const getUserStats = async (req, res, next) => {
  try {
    const users = await User.countDocuments({ role: "user" });
    const admins = await User.countDocuments({ role: "admin" });
    res.json({ users, admins });
  } catch (err) {
    next(err);
  }
};

// Edit User
export const editUser = async (req, res, next) => {
  const { name, email, role } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
};
