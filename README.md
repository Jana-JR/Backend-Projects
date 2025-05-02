# 🛒 MERN eCommerce Platform

A full-stack eCommerce application built with the MERN stack (MongoDB, Express, React, Node.js) with secure authentication, product management, shopping cart, order processing, and Redis integration.

---

## 🚀 Features

- JWT-based user authentication with HTTP-only cookies
- Admin dashboard for product & user management
- Product listing with images and category filters
- Shopping cart and order checkout
- MongoDB + Redis for database and caching
- RESTful API architecture

---

## 🧱 Tech Stack

- **Frontend**: React, Axios, Material UI
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Auth**: JWT + HTTP-only Cookies
- **Cache/Session**: Redis
- **Deployment Ready**

---

## 📁 Folder Structure

## FRONTEND =>>>
└── 📁adminDashboard_React+Vite+tailwind
    └── 📁adminDashboard
        └── .gitignore
        └── eslint.config.js
        └── index.html
        └── package-lock.json
        └── package.json
        └── postcss.config.js
        └── 📁public
            └── vite.svg
        └── README.md
        └── 📁src
            └── App.css
            └── App.jsx
            └── 📁assets
                └── react.svg
            └── 📁components
                └── 📁CartItem
                    └── CartItem.jsx
                └── Navbar.jsx
                └── 📁ProductCard
                    └── ProductCard.jsx
                └── Sidebar.jsx
                └── 📁UserProfile
                    └── AddressManager.jsx
                    └── OrderHistory.jsx
                    └── Sidebar.jsx
            └── 📁context
                └── authContext.jsx
            └── 📁hooks
                └── useFetch.jsx
            └── index.css
            └── main.jsx
            └── 📁pages
                └── 📁Admin
                    └── AddProduct.jsx
                    └── Dashboard.jsx
                    └── EditProduct.jsx
                    └── Orders.jsx
                    └── Product.jsx
                    └── Users.jsx
                └── 📁Auth
                    └── Login.jsx
                    └── Register.jsx
                └── 📁Cart
                    └── Cart.jsx
                └── 📁Checkout
                    └── Checkout.jsx
                └── 📁ErrorPages
                    └── Forbidden403.jsx
                └── 📁Product
                    └── Product.jsx
                └── 📁Profile
                    └── UserProfile.jsx
            └── 📁Routes
                └── RouteLayout.jsx
            └── 📁Utils
                └── axios.js
        └── tailwind.config.js
        └── vite.config.js

## BACKEND =>>>

└── 📁eCommerceBackend
    └── 📁assets
        └── 📁uploads
    └── 📁config
        └── redis.js
        └── session.js
    └── 📁controllers
        └── Address.js
        └── Auth.js
        └── Brand.js
        └── Cart.js
        └── Order.js
        └── Product.js
        └── User.js
    └── 📁database
        └── db.js
    └── 📁middleware
        └── security.js
        └── upload.js
        └── verifyToken.js
    └── 📁models
        └── Address.js
        └── Brand.js
        └── Cart.js
        └── Order.js
        └── Product.js
        └── User.js
    └── 📁routes
        └── Address.js
        └── Auth.js
        └── Brand.js
        └── Cart.js
        └── Order.js
        └── Product.js
        └── Upload.js
        └── User.js
    └── 📁Utils
        └── GenerateToken.js
        └── SanitizeUser.js
    └── .env
    └── package-lock.json
    └── package.json
    └── server.js

## backend/.env =>>>

[#Database Connections]
MONGO_URL=mongodb://localhost:27017/APP_NAME
REDIS_URL=redis://localhost:6379

[# Session Configuration]
SESSION_SECRET=  
COOKIE_DOMAIN=localhost
COOKIE_EXPIRATION_DAYS=7

[# JWT Configuration]
JWT_ACCESS_SECRET= 
JWT_REFRESH_SECRET= 
ACCESS_TOKEN_EXP=15m  # Short-lived access token (15 minutes)
REFRESH_TOKEN_EXP=7d   # Long-lived refresh token (7 days)

[# Application Settings]
PORT=
PRODUCTION=true
ORIGIN=
CORS_ORIGIN=

[# Security Headers]
CONTENT_SECURITY_POLICY="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
HSTS_MAX_AGE=63072000  # 2 years in seconds

[# Rate Limiting]
AUTH_RATE_LIMIT_WINDOW=15  # 15 minutes
AUTH_RATE_LIMIT_MAX=5       # 5 attempts per window


ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_EMAIL=


## Start the Backend
cd eCommerce_Backend
npm install
npm run dev


## Start the Frontend
cd eCommerce_Frontend
npm install
npm run dev


# MERN eCommerce API Documentation

This Postman collection contains all API routes for the MERN eCommerce app, including authentication, address management, product handling, cart operations, brand management, and order processing.

---

## 🔐 Auth

### `POST /auth/register`
Creates a new user.

**Request Body (JSON):**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Returns:** User object with secure HTTP-only JWT cookie.

---

### `POST /auth/login`
Logs in an existing user.

**Request Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Returns:** User data with JWT cookie on success.

---

### `POST /auth/logout`
Logs out the user by clearing the authentication cookie.

**Returns:** Success message.

---

### `GET /auth/me`
Returns details of the currently authenticated user.

**Headers:** Requires HTTP-only cookie (JWT).

---

## 🧾 Address

### `POST /address`
Add a new address for the authenticated user.

**Request Body (JSON):**
```json
{
  "fullName": "User Name",
  "mobile": "9876543210",
  "street": "123 Main Street",
  "city": "Metropolis",
  "state": "CA",
  "country": "USA",
  "pinCode": "90210"
}
```

---

### `GET /address`
Get all addresses for the current user.

---

### `PATCH /address/:id`
Update a specific address.

**Params:** `:id` = Address ObjectId

---

### `DELETE /address/:id`
Delete a specific address.

---

## 🛍️ Product

### `GET /product`
Fetch products with optional filters.
---

### `GET /product/:id`
Fetch a product by ID.

---

### `POST /product`
Add a new product (**Admin only**).

**Request Body (JSON):**
```json
{
  "title": "Product Title",
  "description": "Product Description",
  "price": 100,
  "discountPercentage": 10,
  "brand": "brandId",
  "stockQuantity": 50,
  "thumbnail": "https://...",
  "images": ["https://...", "https://..."]
}
```

---

### `PATCH /product/:id`
Update a product (**Admin only**).

---

### `DELETE /product/:id`
Delete a product (**Admin only**).

---

## 🧺 Cart

### `GET /cart`
Retrieve all items in the authenticated user's cart.

---

### `POST /cart`
Add a product to cart.

**Request Body (JSON):**
```json
{
  "productId": "productId",
  "quantity": 2
}
```

---

### `PATCH /cart/:productId`
Update the quantity of a specific product in cart.

**Request Body (JSON):**
```json
{
  "quantity": 3
}
```

---

### `DELETE /cart/:productId`
Remove a product from the cart.

---

## 🏷️ Brand

### `GET /brand`
Get all brands.

---

### `POST /brand`
Add a new brand (**Admin only**).

**Request Body (JSON):**
```json
{
  "name": "Brand Name"
}
```

---

### `PATCH /brand/:id`
Update a brand (**Admin only**).

---

### `DELETE /brand/:id`
Delete a brand (**Admin only**).

---

## 📦 Order

### `POST /order`
Create an order from the current user's cart.

**Request Body (JSON):**
```json
{
  "addressId": "addressId",
  "paymentMethod": "COD"
}
```

---

### `GET /order`
Get all orders made by the current user.

---

### `GET /order/all`
Get all orders (**Admin only**).

---

### `GET /order/:id`
Get a specific order by ID.

---

### `PATCH /order/:id`
Update an order (e.g., delivery status).

**Request Body (JSON):**
```json
{
  "delivery_status": "shipped"
}
```




