import React from "react";
import { FaPlus } from "react-icons/fa";

const FloatingButton = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 z-50"
      onClick={onClick}
    >
      <FaPlus />
    </button>
  );
};

export default FloatingButton;
