import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({ cart, clearCart, setNotifications }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const totalAmount = cart.products
        .reduce(
          (total, item) => total + item.productId.price * item.quantity,
          0
        )
        .toFixed(2);

      const response = await fetch(
        "http://localhost:5000/api/payment/initialize",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount: totalAmount,
            products: cart.products,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment initialization failed");
      }

      const data = await response.json();

      if (data.status === "success") {
        // Fetch and update notifications
        const notificationResponse = await fetch(
          "http://localhost:5000/api/notifications",
          {
            credentials: "include",
          }
        );

        if (!notificationResponse.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const notificationsData = await notificationResponse.json();
        setNotifications(notificationsData);
        clearCart();
        window.location.href = data.data.checkout_url;
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="border-t border-b py-2 mb-4">
        {cart.products.map((item) => (
          <div key={item.productId._id} className="flex justify-between py-1">
            <span>
              {item.productId.name} x {item.quantity}
            </span>
            <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-bold mb-4">
        <span>Total Price:</span>
        <span>${cart.totalAmount?.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
