// components/AddReview.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddReview = ({ fetchReviews }) => {
  const { productId } = useParams();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      fetchReviews();
      setRating(1);
      setComment("");
      toast.success("Review added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Review</h2>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReview;
