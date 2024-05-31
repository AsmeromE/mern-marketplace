module.exports = {
  darkMode: "class", // Enable dark mode support
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust to your project's structure
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark-bg": "#1a202c", // Example dark background color
        "dark-card": "#2d3748", // Example dark card color
      },
      textColor: {
        "dark-text": "#a0aec0", // Example dark text color
      },
    },
  },
  plugins: [],
};
