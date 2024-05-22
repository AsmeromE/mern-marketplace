import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Placeholder function for the checkout process
    console.log("Proceeding to checkout with cart:", cart);
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart && cart.products && cart.products.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold mb-2">Order Summary</h3>
          <ul>
            {cart.products.map((item) => (
              <li key={item.productId._id} className="mb-2">
                {item.productId.name} - ${item.productId.price} x{" "}
                {item.quantity}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              className="bg-green-500 text-white p-2 rounded mr-4"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Checkout;
