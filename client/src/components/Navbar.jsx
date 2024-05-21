import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authState, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-500 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MERN Marketplace</div>
        <button className="text-white block lg:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div className="hidden lg:flex lg:space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          {authState.user ? (
            <>
              <Link to="/admin" className="text-white hover:text-gray-200">
                Admin
              </Link>
              <Link to="/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white hover:text-gray-200">
                Sign Up
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-16 right-0 w-2/3 max-w-xs bg-blue-900 bg-opacity-90 text-center rounded-md shadow-lg lg:hidden">
          <div className="container mx-auto flex flex-col space-y-4 py-4">
            <Link
              to="/"
              className="text-white hover:bg-blue-800 py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            {authState.user ? (
              <>
                <Link
                  to="/admin"
                  className="text-white hover:bg-blue-800 py-2"
                  onClick={closeMenu}
                >
                  Admin
                </Link>
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-blue-800 py-2"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="text-white hover:bg-blue-800 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-white hover:bg-blue-800 py-2"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-800 py-2"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
