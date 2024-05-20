import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received data:", { name, email, password }); // Log received data
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
