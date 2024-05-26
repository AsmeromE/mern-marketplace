import React, { useState, useContext, useEffect } from "react";
import UserList from "../components/UserList";
import AddUser from "../components/AddUser";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
import AdminOrders from "../components/AdminOrders";
import AdminReviews from "../components/AdminReviews";
import Dashboard from "../components/Dashboard";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = ({ addProduct, products, fetchProducts, deleteProduct }) => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("adminTab") || "dashboard"
  );
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (authState.user?.role !== "admin") {
      console.error("Access denied");
      navigate("/");
      return;
    }
    fetchUsers();
  }, [authState.user, navigate]);

  useEffect(() => {
    localStorage.setItem("adminTab", activeTab);
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return (
          <>
            <AddUser fetchUsers={fetchUsers} />
            <UserList users={users} setUsers={setUsers} />
          </>
        );
      case "products":
        return (
          <>
            <ProductList
              fetchCart={() => {}}
              products={products}
              fetchProducts={fetchProducts}
              deleteProduct={deleteProduct}
              addProduct={addProduct}
            />
          </>
        );
      case "orders":
        return <AdminOrders />;
      case "reviews":
        return <AdminReviews />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1> */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`p-2 mr-2 ${
            activeTab === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`p-2 mr-2 ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`p-2 mr-2 ${
            activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`p-2 mr-2 ${
            activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`p-2 ${
            activeTab === "reviews" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Reviews
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default Admin;
