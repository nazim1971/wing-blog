
# Wink-Blog Server

## Live Server Link
[Wink-blog](https://wing-blog.vercel.app)

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Run the Server Locally](#run-the-server-locally)
- [Authentication](#authentication)
- [Blog Management](#blog-management)
- [Admin Actions](#admin-actions)
- [Search, Sort & Filter Blogs](#search-sort-filter-blogs)
- [Error Handling](#error-handling)

## Overview
**Wink Blog** is a robust backend built for managing blogs with user authentication, role-based access control, and API functionalities. It supports Admin and User roles with tailored permissions and features.

## Key Features
- **User Authentication & Authorization**: Secure login with role-based access control (Admin, User).
- **Role Management**: Admins manage all blogs and users, while users manage their own content.
- **JWT-Based Security**: Secure session management using access and refresh tokens.
- **Middleware Protection**: Role-based access enforced through middleware.
- **Blog Management**: Full CRUD operations with ownership validation.
- **Search, Sort & Filter**: Powerful querying using a reusable `QueryBuilder`.
- **Password Encryption**: Secure password hashing using bcrypt.
- **Data Validation**: Input validation using Zod schemas.
- **Scalable Architecture**: Modular backend design for easy maintainability.

## Technologies Used
- **TypeScript** – Typed JavaScript for scalability.
- **Node.js** – JavaScript runtime.
- **Express.js** – Web framework.
- **Mongoose** – MongoDB object modeling.
- **bcrypt** – Password hashing.
- **jsonwebtoken** – JWT implementation.
- **cookie-parser** – Cookie parsing.
- **zod** – TypeScript-first schema validation.
- **cors** – Enables CORS in Express.
- **dotenv** – Loads environment variables from `.env`.

## Run the Server Locally

### Prerequisites
- **Node.js** (v20+)
- **npm** package manager

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/nazim1971/wing-blog.git
   cd wing-blog
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables in `.env` file:
   ```
   PORT=your_port
   DATABASE_URI=your_mongo_uri
   BCRYPT_SALT_ROUNDS=your_salt_rounds
   DEFAULT_PASS=your_default_password
   NODE_ENV=development
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

   The server will be running at [http://localhost:your_port](http://localhost:your_port).

## Authentication

### User Registration
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully!",
    "statusCode": 201,
    "data": {
      "_id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### User Login
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful!",
    "statusCode": 200,
    "data": {
      "token": "string"
    }
  }
  ```

## Blog Management

### Create Blog
- **Method**: `POST`
- **Endpoint**: `/api/blogs`
- **Request Header**:
  ```Authorization: Bearer <token>```
- **Request Body**:
  ```json
  {
    "title": "My First Blog",
    "content": "This is my blog content."
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Blog created successfully!",
    "statusCode": 201,
    "data": {
      "_id": "string",
      "title": "My First Blog",
      "content": "This is my blog content.",
      "author": {
        "_id": "author id",
        "name": "author name",
        "email": "author email"
      }
    }
  }
  ```

## Admin Actions

### Block User
- **Method**: `PATCH`
- **Endpoint**: `/api/admin/users/:userId/block`
- **Request Header**:
  ```Authorization: Bearer <admin_token>```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User blocked successfully!",
    "statusCode": 200
  }
  ```

## Error Handling
All error responses follow a consistent structure:
```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": {
    "details": [
      {
        "name": "Error name",
        "path": "where error occurred",
        "message": "Error message"
      }
    ]
  },
  "stack": "Error stack trace if available"
}
```

## Admin Credentials
- **Email**: wink@gmail.com
- **Password**: Wink123

