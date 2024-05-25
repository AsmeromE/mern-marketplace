import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/admin/orders",
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-2">Order {order.tx_ref}</h3>
              <div className="border-t border-b py-2 mb-4">
                {order.products.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex justify-between py-1"
                  >
                    <span>
                      {item.productId.name} x {item.quantity}
                    </span>
                    <span>
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold mb-4">
                <span>Total Price:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default AdminOrders;
