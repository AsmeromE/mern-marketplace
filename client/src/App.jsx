import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ products: [] });

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/cart"
              element={<ShoppingCart fetchCart={fetchCart} cart={cart} />}
            />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route
              path="/"
              element={
                <>
                  <AddProduct addProduct={addProduct} />
                  <ProductList
                    fetchCart={fetchCart}
                    deleteProduct={deleteProduct}
                    products={products}
                  />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
