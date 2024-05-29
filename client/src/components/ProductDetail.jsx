import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = ({ setNotificationsCount }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notifications", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
      setNotificationsCount(data.filter((n) => !n.read).length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reviews/product/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/notifications",
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotificationsCount(data.filter((n) => !n.read).length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
    fetchProduct();
    fetchReviews();
  }, [productId]);

  const handleAddReview = async (e) => {
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
          body: JSON.stringify({ comment, rating }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add review");
      }
      const newReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setComment("");
      setRating(1);
      toast.success("Review added successfully!");
    } catch (error) {
      toast.error("Failed to add review");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {product && (
        <>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">${product.price}</p>
          <p className="mb-4">{product.category}</p>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="mb-4 border-b pb-2">
                  <p>{review.comment}</p>
                  <span className="text-yellow-500">
                    Rating: {review.rating}
                  </span>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Add a Review</h2>
            <form onSubmit={handleAddReview}>
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comment"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Rating
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Review
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
