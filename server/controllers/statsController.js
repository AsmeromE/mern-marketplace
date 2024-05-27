import Order from "../models/Order.js";
import User from "../models/User.js";

// Get user statistics
export const getUserStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const admins = await User.countDocuments({ role: "admin" });

    res.status(200).json({ users, admins });
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    res.status(500).json({ message: "Failed to fetch user statistics", error });
  }
};

// Get sales data
export const getSalesData = async (req, res) => {
  const { type } = req.query; // monthly, quarterly, yearly
  let matchStage;
  switch (type) {
    case "monthly":
      matchStage = {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$totalAmount" },
        },
      };
      break;
    case "quarterly":
      matchStage = {
        $group: {
          _id: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } },
          totalSales: { $sum: "$totalAmount" },
        },
      };
      break;
    case "yearly":
      matchStage = {
        $group: {
          _id: { $year: "$createdAt" },
          totalSales: { $sum: "$totalAmount" },
        },
      };
      break;
    default:
      return res.status(400).json({ message: "Invalid type parameter" });
  }

  try {
    const salesData = await Order.aggregate([
      { $match: { status: "completed" } },
      matchStage,
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(salesData);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Failed to fetch sales data", error });
  }
};
