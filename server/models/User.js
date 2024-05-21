import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { autoIndex: true }
); // Enable autoIndex in schema

const User = mongoose.model("User", UserSchema);
User.createIndexes(); // Ensure index creation explicitly

export default User;
