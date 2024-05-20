import React, { useState } from "react";

const AddUser = ({ addUserToList }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors ? error.errors[0].msg : error.message);
      }
      const newUser = await response.json();
      addUserToList(newUser);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
