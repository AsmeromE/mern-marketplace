import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
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
          headers: {
            "Content-Type": "application/json",
          },
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
        clearCart();
        window.location.href = data.data.checkout_url;
      } else {
        toast.error("Payment initialization failed");
      }
    } catch (error) {
      toast.error("Failed to place order.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
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
        <span>
          $
          {cart.products
            .reduce(
              (total, item) => total + item.productId.price * item.quantity,
              0
            )
            .toFixed(2)}
        </span>
      </div>
      <button
        className="bg-green-500 text-white p-2 rounded mr-2"
        onClick={handleCheckout}
      >
        Confirm Order
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => navigate("/cart")}
      >
        Cancel
      </button>
    </div>
  );
};

export default Checkout;
