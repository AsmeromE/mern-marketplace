import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import MongoStore from "connect-mongo";
import apiRoutes from "./routes/api.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/order.js";
import reviewRoutes from "./routes/review.js";
import statsRoutes from "./routes/stats.js";
import notificationRoutes from "./routes/notification.js";
import errorHandler from "./middleware/errorHandler.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://hoppscotch.io"],
    credentials: true,
  },
});
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { autoIndex: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error.message));

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://hoppscotch.io"],
    credentials: true,
  })
);

// Rate Limiting Middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 500, // limit each IP to 500 requests per windowMs
//   handler: (req, res) => {
//     res
//       .status(429)
//       .json({ message: "Too many requests, please try again later." });
//   },
// });
// app.use(limiter);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", apiRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
