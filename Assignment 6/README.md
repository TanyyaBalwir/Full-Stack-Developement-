# Assignment 6

## Problem Statement

Build a simple e-commerce web application using separate `frontend` and `backend` folders. The website should begin with a registration page, save user details into MongoDB, allow users to shop from the product list, and store placed order entries in MongoDB so they can be checked in MongoDB Compass.

## Objective

- Keep the frontend close to the original `Ecommerce` project design
- Add a registration page before entering the shop
- Store registered users in the `users` collection
- Allow users to add products to cart and place orders
- Store placed order entries in the `products` collection
- Make the MongoDB data visible in MongoDB Compass

## Explanation

This project has two folders:

- `frontend` for the user interface using HTML, CSS, JavaScript, and Bootstrap
- `backend` for Express.js, MongoDB, and Mongoose

### Frontend Flow

1. User first sees a registration form
2. After registration, the shop page opens
3. User adds products to the cart
4. User goes to checkout and places the order

### Backend Flow

- Registered user details are stored in MongoDB `users`
- Product catalog is available through the backend API
- When checkout happens, selected cart items are saved in MongoDB `products`

### MongoDB Collections

- `users` stores registered user details
- `products` stores:
  - catalog items with `entryType: "catalog"`
  - order entries with `entryType: "order"`

## Output

- Registration page at the beginning of the website
- Shopping interface similar to the original ecommerce frontend
- Registered users visible in MongoDB Compass under `users`
- Placed orders visible in MongoDB Compass under `products`

## Run Commands

### Backend

```bash
cd "Assignment 6/backend"
npm install
node server.js
```

Backend runs on:

```bash
http://localhost:5001
```

### Frontend

```bash
cd "Assignment 6/frontend"
python -m http.server 5500
```

Open in browser:

```bash
http://localhost:5500/index.html
```

## Environment File

Create a `.env` file inside `Assignment 6/backend` and add:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
```

## MongoDB Compass Check

1. Open MongoDB Compass
2. Connect to:

```bash
mongodb://127.0.0.1:27017
```

3. Open database:
`ecommerce`

4. Open collection:
`users`
to see registered users

5. Open collection:
`products`
to see catalog items and placed orders

Use these filters if needed:

```json
{ "entryType": "catalog" }
```

```json
{ "entryType": "order" }
```
