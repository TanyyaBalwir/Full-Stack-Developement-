# Assignment 3

## Problem Statement

Build a simple full-stack e-commerce web application with a frontend for product browsing and cart handling, and a backend for managing users and product data using MongoDB.

## Objective

- Connect a frontend interface with an Express.js backend
- Fetch product data from the backend and display it dynamically
- Implement cart functionality on the frontend
- Practice MongoDB integration with Mongoose

## Explanation

This assignment contains two main folders:

- `Frontend` for the user interface using HTML, CSS, JavaScript, and Bootstrap
- `Backend` for the server-side logic using Express.js, MongoDB, Mongoose, and related packages

### Frontend

- The project is named `Street Style Shop`
- Products are fetched from `http://localhost:5000/api/products`
- Product cards are rendered dynamically on the home page
- Users can add items to the cart, increase or decrease quantity, and view the total price
- Cart data is stored in `localStorage` so it persists in the browser
- The interface includes Home, Cart, and Checkout sections

### Backend

- The backend is built with Express.js
- MongoDB is connected using `mongoose.connect(process.env.MONGO_URI)`
- Routes are available for:
  - user-related operations at `/api/users`
  - product-related operations at `/api/products`
- Uploaded product images are served from the `/uploads` folder

## Output

- A working e-commerce frontend that displays products from the backend
- A cart system with quantity updates and total price calculation
- A backend server connected to MongoDB for handling product and user data
