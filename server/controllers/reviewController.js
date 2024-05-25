// controllers/reviewController.js
import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

// Add a review to a product
export const addReview = async (req, res) => {
  const { productId } = req.params;
  console.log("productId", productId);
  const { comment, rating } = req.body;
  const userId = req.session.userId;

  try {
    const newReview = new Review({
      productId: new mongoose.Types.ObjectId(productId),
      userId,
      comment,
      rating,
    });

    await newReview.save();

    const product = await Product.findById(productId);
    product.reviews.push(newReview._id);
    await product.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Failed to add review", error });
  }
};

// Get all reviews for a product
export const getReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({
      productId: new mongoose.Types.ObjectId(productId),
    }).populate("userId");
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// Get all reviews for admin
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId")
      .populate("productId");
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Remove review reference from product
    const product = await Product.findById(review.productId);
    product.reviews = product.reviews.filter(
      (id) => id.toString() !== reviewId
    );
    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review", error });
  }
};
