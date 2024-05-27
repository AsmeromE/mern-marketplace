import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Admin from "./components/Admin";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderHistory from "./components/OrderHistory";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ products: [] });
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      fetchProducts();
      toast.success("Product added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product.");
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      fetchProducts();
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  const addUser = async (user) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      fetchUsers();
      toast.success("User added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add user.");
    }
  };

  const updateUser = async (userId, user) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      fetchUsers();
      toast.success("User updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      fetchUsers();
      toast.success("User deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/clear", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
      setCart({ products: [] });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchUsers();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Navbar />
          <ToastContainer
            position="bottom-left"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            limit={1}
          />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <Admin
                  addProduct={addProduct}
                  updateProduct={updateProduct}
                  products={products}
                  fetchProducts={fetchProducts}
                  deleteProduct={deleteProduct}
                  // addUser={addUser}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                  users={users}
                />
              }
            />
            <Route
              path="/cart"
              element={<ShoppingCart fetchCart={fetchCart} cart={cart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} clearCart={clearCart} />}
            />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route
              path="/"
              element={
                <ProductList
                  fetchCart={fetchCart}
                  deleteProduct={deleteProduct}
                  products={products}
                  addProduct={addProduct}
                  updateProduct={updateProduct}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
