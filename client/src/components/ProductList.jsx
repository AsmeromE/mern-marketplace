import React, { useEffect, useState } from "react";

const ProductList = ({ fetchCart, deleteProduct, products }) => {
  const [update, setUpdate] = useState(false); // State to track updates

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
      fetchCart();
      setUpdate(!update); // Trigger update
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // No need to fetch products here as they are passed as a prop
  }, [update]); // Re-fetch products when 'update' changes

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
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
            <button
              className="bg-red-500 text-white p-2 rounded mt-2 ml-2"
              onClick={() => deleteProduct(product._id)}
            >
              Delete Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
