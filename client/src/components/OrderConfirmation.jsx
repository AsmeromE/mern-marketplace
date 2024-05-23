import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { cart, orderNumber } = location.state;

  const calculateTotalPrice = () => {
    return cart.products
      .reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <p className="mb-4">
        Thank you for your purchase! Your order number is{" "}
        <strong>{orderNumber}</strong>.
      </p>
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
      <div className="flex justify-between font-bold">
        <span>Total Price:</span>
        <span>${calculateTotalPrice()}</span>
      </div>
    </div>
  );
};

export default OrderConfirmation;
