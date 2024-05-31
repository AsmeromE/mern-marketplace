import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit, FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import FloatingButton from "./FloatingButton";

const ProductList = ({
  fetchCart,
  products,
  deleteProduct,
  addProduct,
  updateProduct,
}) => {
  const { authState } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [editProductData, setEditProductData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const productsPerPage = 24;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(productData);
      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      setIsAddModalOpen(false);
      setUpdate(!update);
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editProductData._id, editProductData);
      setEditProductData({
        _id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      setIsEditModalOpen(false);
      setUpdate(!update);
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setUpdate(!update);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");
      await fetchCart();
      setUpdate(!update);
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
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
      <input
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      {authState.user?.role === "admin" && (
        <FloatingButton onClick={() => setIsAddModalOpen(true)} />
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {currentProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white p-2 rounded shadow-md hover:shadow-lg transform transition-all duration-200 dark:bg-gray-700"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded"
              />
              <div className="mt-2">
                <h3 className="text-md font-bold mb-1">{product.name}</h3>
                <p className="mb-1">{product.description}</p>
                <p className="mb-1 font-semibold">${product.price}</p>
                <p className="mb-1">{product.category}</p>
                <div className="flex justify-between items-center">
                  {authState.user?.role === "admin" ? (
                    <>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditProductData(product);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteProduct(product._id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product._id);
                      }}
                    >
                      <FaCartPlus />
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
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
                : "bg-white text-blue-500 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3 dark:bg-gray-700 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Description"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Category"
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={productData.image}
                  onChange={(e) =>
                    setProductData({ ...productData, image: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3 dark:bg-gray-700 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditProduct}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editProductData.name}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Description"
                  value={editProductData.description}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={editProductData.price}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Category"
                  value={editProductData.category}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editProductData.image}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      image: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
