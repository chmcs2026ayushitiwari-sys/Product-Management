# Product Management System (Backend)

This is a Backend Node.js project for the Product Management System.

## Student Details
- **Name**: Ayushi Tiwari
- **Roll Number**: 110
- **Batch**: B5

## Features
- **Backend**: Node.js, Express, MongoDB (Mongoose), ES Modules.
- **Functionality**:
  - Full CRUD (Create, Read, Update, Delete) operations.
  - **Search** products by name.
  - **Sort** products by price (Low to High / High to Low).

## Prerequisites
- Node.js installed.
- MongoDB installed and running locally (or update `.env` with Atlas URI).

## Setup & Run

Open a terminal in the root directory:
```bash
cd backend
npm install
npm run dev
```
*Server will start on http://localhost:5000*

## API Endpoints
- `GET /api/products` - Get all products (supports `?search` and `?sort`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
