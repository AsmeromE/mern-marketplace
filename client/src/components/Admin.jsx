import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import AddUser from "../components/AddUser";

const Admin = () => {
  const [users, setUsers] = useState([]);

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
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <AddUser fetchUsers={fetchUsers} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
};

export default Admin;
