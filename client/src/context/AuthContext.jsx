import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
  });

  const login = (token, user) => {
    setAuthState({ token, user });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setAuthState({ token: "", user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearCart();
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
