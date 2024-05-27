# MERN Marketplace

## Overview

MERN Marketplace is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to browse, add products to their cart, and make purchases. Admin users have the capability to manage products, users, and orders.

## Features

### User Features
- User registration and authentication
- Browse products
- Add products to cart
- Checkout and make payments using Chapa
- View order history
- Leave product reviews

### Admin Features
- Manage users
- Manage products
- View all orders
- View all reviews
- Dashboard for an overview

## Technologies Used
- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **Payment Integration**: Chapa
- **State Management**: Context API
- **Miscellaneous**: Axios, React Toastify

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- Chapa account (for payment integration)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/AsmeromE/mern-marketplace.git
    cd mern-marketplace
    ```

2. **Install backend dependencies**
    ```bash
    cd server
    npm install
    ```

3. **Install frontend dependencies**
    ```bash
    cd ../client
    npm install
    ```

4. **Setup environment variables**

    Create a `.env` file in the `server` directory with the following contents:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CHAPA_AUTH_KEY=your_chapa_auth_key
    SESSION_SECRET=your_session_secret
    ```

5. **Start the backend server**
    ```bash
    cd server
    npm start
    ```

6. **Start the frontend development server**
    ```bash
    cd ../client
    npm run dev
    ```

### Usage

- Access the application at `http://localhost:5173`
- Register a new user or login with existing credentials
- Admin users can navigate to the Admin dashboard to manage the application

## Project Structure

```
mern-marketplace/
│
├── server/
│   ├── controllers/        # API endpoint logic
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Express server setup
│
├── client/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context API setup
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main React component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Environment variables
│   └── vite.config.js      # Vite configuration
│
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to Muse-feta for the Chapa integration guide!

## Contact

For any inquiries or issues, please contact [Asmerom](https://github.com/AsmeromE).