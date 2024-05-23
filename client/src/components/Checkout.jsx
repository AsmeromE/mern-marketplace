import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // Implement checkout logic
      // For example, payment processing logic here
      const orderNumber = Math.floor(Math.random() * 1000000); // Simulating an order number
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/order-confirmation", { state: { cart, orderNumber } });
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
