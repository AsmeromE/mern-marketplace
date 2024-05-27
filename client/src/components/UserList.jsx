import React, { useState } from "react";
import { FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const UserList = ({ fetchUsers, users, addUser, updateUser, deleteUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [editUserId, setEditUserId] = useState(null);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(userData);
      setUserData({ name: "", email: "", role: "", password: "" });
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to add user.");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editUserId, editUserData);
      setEditUserData({ name: "", email: "", role: "", password: "" });
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">User List</h2> */}
      <button
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
        onClick={() => setIsModalOpen(true)}
      >
        <FaUserPlus />
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transform transition-all duration-200"
          >
            <h3 className="text-md font-bold mb-1">{user.name}</h3>
            <p className="mb-1">{user.email}</p>
            <p className="mb-1">{user.role}</p>
            <div className="flex justify-between items-center">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  setEditUserId(user._id);
                  setEditUserData({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    password: "",
                  });
                  setIsEditModalOpen(true);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteUser(user._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <select
                  value={userData.role}
                  onChange={(e) =>
                    setUserData({ ...userData, role: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editUserData.name}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={editUserData.email}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <select
                  value={editUserData.role}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, role: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={editUserData.password}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      password: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
