import React, { useContext, useEffect, useState } from "react";
import UserList from "../components/UserList";
import AddUser from "../components/AddUser";
import AddProduct from "../components/AddProduct";
import AdminOrders from "../components/AdminOrders";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = ({ addProduct }) => {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <AddUser fetchUsers={fetchUsers} />
      <UserList users={users} setUsers={setUsers} />
      <AddProduct addProduct={addProduct} />
      <AdminOrders />
    </div>
  );
};

export default Admin;
