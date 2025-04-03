# ProShop E-Commerce Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)](https://www.mongodb.com/mern-stack)

ProShop is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It includes features like user authentication, product management, shopping cart, order processing, and an admin dashboard.

## Features

- **User Authentication**: Login/Register with JWT-based authorization
- **Product Catalog**: Browse products with images, prices, and descriptions
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout Process**: Shipping address, payment method (PayPal integration), and order summary
- **Order Management**: View order history and details
- **Admin Dashboard**: 
  - Manage products, users, and orders
  - Mark orders as delivered
  - View sales statistics
- **Product Reviews**: Users can leave ratings and comments
- **Search & Pagination**: Filter products by keyword or page through results

## Technologies Used

### Frontend
- React.js
- Redux (State management)
- React Bootstrap (UI framework)
- Axios (HTTP client)

### Backend
- Node.js & Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JSON Web Tokens (Authentication)
- Bcrypt.js (Password hashing)

### Payment Integration
- PayPal API

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shaikhumar2001/proshop.git
   cd proshop
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory with:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Seed sample data (optional)**
   ```bash
   cd backend
   npm run data:import  # Import sample data
   npm run data:destroy # Destroy sample data
   ```

5. **Run the application**
   ```bash
   # Start backend server (from /backend)
   npm run server

   # Start frontend (from /frontend in new terminal)
   npm start
   ```

## Configuration

Ensure you have:
- MongoDB Atlas account or local MongoDB instance
- Node.js (v14+ recommended)
- PayPal developer account for payment integration

## Usage

1. Visit `http://localhost:3000` in your browser
2. Register as a new user or use test credentials:
   ```
   Admin: admin@example.com / 123456
   User: user@example.com / 123456
   ```
3. Explore features:
   - Browse products
   - Add items to cart
   - Complete checkout process
   - View order history
   - (Admin) Manage users/products through dashboard

## Live Demo

Check out the deployed version: [ProShop Live Demo](https://proshop-omega.vercel.app/)

## Contact

Umar Shaikh  
📧 shaikhumar2001@gmail.com  
💼 [LinkedIn Profile](https://www.linkedin.com/in/shaikhumar2001/)
