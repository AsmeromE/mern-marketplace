import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const { authState } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (authState.user?.role !== "admin") {
      console.error("Access denied");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          credentials: "include", // Ensure credentials are included
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

    fetchUsers();
  }, [authState.user]);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include", // Ensure credentials are included
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  if (authState.user?.role !== "admin") {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Admin - User Management</h2>
      <ul className="list-disc pl-5">
        {users?.map((user) => (
          <li key={user._id} className="mb-1">
            {user.name} ({user.email}) - {user.role}
            <button
              onClick={() => handleDelete(user._id)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
