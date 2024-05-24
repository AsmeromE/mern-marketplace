import React from "react";

const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/api/chapa/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 100,
        email: "user@example.com",
        first_name: "John",
        last_name: "Doe",
        tx_ref: `tx-${Date.now()}`,
        callback_url: "http://localhost:5173/order-confirmation",
      }),
    });

    const data = await response.json();
    window.location.href = data.checkout_url;
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white p-2 rounded"
      >
        Pay with Chapa
      </button>
    </div>
  );
};

export default Payment;
