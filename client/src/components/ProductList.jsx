import React, { useEffect, useState, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = ({ fetchCart, products, deleteProduct }) => {
  const { authState } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      await fetchCart();
      setUpdate(!update);
      toast.success("Item added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setUpdate(!update);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [products, update]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">Product List</h2> */}
      <input
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
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
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete Product
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({
              length: Math.ceil(filteredProducts.length / productsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
