import React, { useState, useContext, useEffect } from "react";
import UserList from "../components/UserList";
import ProductList from "../components/ProductList";
import AdminOrders from "../components/AdminOrders";
import AdminReviews from "../components/AdminReviews";
import Dashboard from "../components/Dashboard";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = ({ addProduct, updateProduct, products, deleteProduct }) => {
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
          <UserList
            fetchUsers={fetchUsers}
            users={users}
            addUser={addUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        );
      case "products":
        return (
          <ProductList
            fetchCart={() => {}}
            products={products}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            addProduct={addProduct}
          />
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
