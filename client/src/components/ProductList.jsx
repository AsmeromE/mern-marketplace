import React, { useEffect, useState, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext";

const ProductList = ({ fetchCart, products }) => {
  const { authState } = useContext(AuthContext);
  const [update, setUpdate] = useState(false); // State to track updates
  const [loading, setLoading] = useState(true);

  const addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure session cookies are sent with the request
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      await fetchCart();
      setUpdate(!update); // Trigger update
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setUpdate(!update);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [products, update]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="mb-2">{product.description}</p>
              <p className="mb-2 font-semibold">${product.price}</p>
              <p className="mb-2">{product.category}</p>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded mt-2"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
              {authState.user?.role === "admin" && (
                <button
                  className="bg-red-500 text-white p-2 rounded mt-2 ml-2"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete Product
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
