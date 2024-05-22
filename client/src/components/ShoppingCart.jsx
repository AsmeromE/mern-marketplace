import React, { useEffect } from "react";

const ShoppingCart = ({ fetchCart, cart }) => {
  // Function to fetch cart items
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
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart && cart.products && cart.products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {cart.products.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white p-4 rounded shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{item.productId.name}</h3>
              <p className="mb-2">Quantity: {item.quantity}</p>
              <p className="mb-2 font-semibold">
                Price: ${item.productId.price}
              </p>
              <button
                className="bg-red-500 text-white p-2 rounded mt-2"
                onClick={() => removeFromCart(item.productId._id)}
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default ShoppingCart;
