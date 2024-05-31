import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCart = ({ fetchCart, cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    cart.products.forEach((item) => {
      total += item.productId.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure session cookies are sent with the request
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      await fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure session cookies are sent with the request
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }
      await fetchCart();
      toast.success("Item quantity updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update item quantity");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (cart?.products) {
      calculateTotalPrice();
    }
  }, [cart]);

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2> */}
      {cart && cart.products && cart.products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-4">
            {cart.products.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">
                  {item.productId.name}
                </h3>
                <p className="mb-2">Quantity: {item.quantity}</p>
                <p className="mb-2 font-semibold">
                  Price: ${item.productId.price}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-300 dark:bg-gray-600 p-2 rounded"
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-300 dark:bg-gray-600 p-2 rounded"
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-500 dark:bg-red-700 text-white p-2 rounded mt-2"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold">
              Total Price: ${totalPrice.toFixed(2)}
            </h3>
          </div>
          <Link to="/checkout">
            <button className="bg-green-500 dark:bg-green-700 text-white p-2 rounded mt-4">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default ShoppingCart;
