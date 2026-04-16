# Assignment 5

## Problem Statement

Enhance a portfolio website by integrating a backend contact form system so that user messages submitted from the frontend can be sent to an Express.js server and stored in MongoDB.

## Objective

- Convert a static portfolio into a simple full-stack project
- Connect the contact form in the frontend with a backend API
- Store submitted contact details in MongoDB
- Practice form handling, API communication, and database connectivity

## Explanation

This assignment contains two folders:

- `frontend` for the portfolio user interface
- `backend` for the contact form API and MongoDB connection

### Frontend

- The frontend reuses the personal portfolio layout from the earlier assignment
- A contact form is added with fields for name, email, and message
- JavaScript captures the form submission and sends the data to `http://localhost:5000/api/contact` using `fetch`
- A response message is shown on the page after form submission

### Backend

- The backend is built using Express.js with CORS enabled
- MongoDB is connected using Mongoose and the `MONGO_URI` value from the `.env` file
- Contact form routes are handled through `/api/contact`
- Submitted messages can be stored in MongoDB through the backend models and routes

## Output

- A portfolio website with a working contact form
- Form data is sent from the frontend to the backend API
- Contact messages are processed by the server and can be stored in MongoDB successfully
