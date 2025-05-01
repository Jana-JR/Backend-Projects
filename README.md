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

# Database Connections
MONGO_URL=mongodb://localhost:27017/APP_NAME
REDIS_URL=redis://localhost:6379

# Session Configuration
SESSION_SECRET=  
COOKIE_DOMAIN=localhost
COOKIE_EXPIRATION_DAYS=7

# JWT Configuration
JWT_ACCESS_SECRET= 
JWT_REFRESH_SECRET= 
ACCESS_TOKEN_EXP=15m  # Short-lived access token (15 minutes)
REFRESH_TOKEN_EXP=7d   # Long-lived refresh token (7 days)

# Application Settings
PORT=
PRODUCTION=true
ORIGIN=
CORS_ORIGIN=

# Security Headers
CONTENT_SECURITY_POLICY="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
HSTS_MAX_AGE=63072000  # 2 years in seconds

# Rate Limiting
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
npm start
