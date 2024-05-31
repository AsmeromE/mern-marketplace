import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews/admin", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setReviews(reviews.filter((review) => review._id !== reviewId));
      toast.success("Review deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2> */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-gray-700 p-4 rounded shadow-md"
            >
              <p className="font-bold">{review.userId.name}</p>
              <p>{review.comment}</p>
              <p className="text-yellow-500">Rating: {review.rating}/5</p>
              <button
                className="bg-red-500 text-white p-2 rounded mt-2"
                onClick={() => deleteReview(review._id)}
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default AdminReviews;
