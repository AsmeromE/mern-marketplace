// src/components/NotificationProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAsRead = async () => {
    try {
      await fetch("http://localhost:5000/api/notifications/mark-as-read", {
        method: "PUT",
        credentials: "include",
      });
      setNotifications([]);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
