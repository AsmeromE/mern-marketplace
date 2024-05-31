import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Import Tailwind CSS
import App from "./App";

const applyTheme = (theme) => {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};

const Main = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <React.StrictMode>
      <App toggleTheme={toggleTheme} />
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Main />);
