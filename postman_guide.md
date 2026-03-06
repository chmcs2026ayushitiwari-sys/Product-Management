# Postman Testing Guide

Use these details to test your **Product Management System Backend**.

**Base URL**: `http://localhost:5000/api/products`

## 1. Create a Product (POST)
**URL**: `POST http://localhost:5000/api/products`
**Body** (Select `raw` -> `JSON`):
```json
{
  "productName": "Gaming Laptop",
  "category": "Electronics",
  "price": 1200,
  "quantity": 10,
  "description": "High performance gaming laptop",
  "supplierName": "TechUtils Inc."
}
```

## 2. Get All Products (GET)
**URL**: `GET http://localhost:5000/api/products`

## 3. Search Products (GET)
**URL**: `GET http://localhost:5000/api/products?search=Gaming`

## 4. Sort by Price (GET)
**URL**: `GET http://localhost:5000/api/products?sort=asc` (Low to High)
**URL**: `GET http://localhost:5000/api/products?sort=desc` (High to Low)

## 5. Get Single Product (GET)
**URL**: `GET http://localhost:5000/api/products/<PASTE_ID_HERE>`
*(Replace `<PASTE_ID_HERE>` with an `_id` from the "Get All Products" response)*

## 6. Update Product (PUT)
**URL**: `PUT http://localhost:5000/api/products/<PASTE_ID_HERE>`
**Body**:
```json
{
  "price": 1150,
  "quantity": 8
}
```

## 7. Delete Product (DELETE)
**URL**: `DELETE http://localhost:5000/api/products/<PASTE_ID_HERE>`
