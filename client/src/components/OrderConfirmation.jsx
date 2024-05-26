import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OrderConfirmation = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const tx_ref = params.get("tx_ref");

      try {
        const response = await fetch(
          `http://localhost:5000/api/payment/verify?tx_ref=${tx_ref}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.order) {
          setOrder(data.order);
          toast.success("Payment verified successfully!");
        } else {
          toast.error("Payment verification failed.");
        }
      } catch (error) {
        toast.error("Failed to verify payment.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <p className="mb-4">Thank you for your order!</p>
      <p className="mb-4">Order Number: {order?.tx_ref}</p>
      <div className="border-t border-b py-2 mb-4">
        {order?.products.map((item) => (
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
        <span>${order?.totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderConfirmation;
