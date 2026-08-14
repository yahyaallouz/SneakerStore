<div align="center">

  # 👟 SneakerStore
  ### Premium E-Commerce Platform for Footwear & Apparel

  [![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)
  [![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
  [![REST API](https://img.shields.io/badge/API-RESTful-green?logo=postman&logoColor=white)]()
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

  **A full-stack, modern e-commerce application built with React 19 and Laravel 12 API.**

  [Explore Features](#-key-features) • [Screenshots](#-screenshots-showcase) • [UML Diagrams](#-system-architecture--uml) • [Installation](#-getting-started)

</div>

---

## 📌 Overview

**SneakerStore** is an enterprise-grade e-commerce web application engineered for high-performance footwear sales. It combines a dynamic, responsive user interface powered by React 19 with a robust, RESTful API backend built on the Laravel 12 framework.

The platform provides a seamless shopping experience for customers—including interactive product catalog filtering, real-time cart drawer, order tracking, and account management—alongside a comprehensive Administrative Dashboard for inventory management, sales analytics, and order fulfillment.

---

## ✨ Key Features

### 🛒 Customer Storefront
- **Dynamic Homepage & Catalog:** Hero banners, trending products, curated collections (Men's, Women's, Kids'), and responsive filtering by brand, size, price, and color.
- **Product Details Page:** Multi-image product gallery, size selection, stock status, product specs, and customer reviews.
- **Real-Time Cart Drawer:** Interactive slide-out cart drawer with live subtotal calculation and item manipulation.
- **Seamless Checkout:** Multi-step checkout with address validation and order summary.
- **Order Tracking:** Real-time order status updates and order history for registered users.
- **User Authentication:** Secure Sanctum-powered authentication (Login, Register, Password Reset).

### 🛡️ Admin Dashboard & Analytics
- **Analytics Overview:** Interactive metrics powered by Recharts (total revenue, daily sales, order velocity, top-selling products).
- **Product Management:** Full CRUD operations for products (image upload, pricing, stock levels, categories, variants).
- **Order Fulfillment:** Comprehensive order management table with status updating (Pending, Processing, Shipped, Delivered).
- **Customer Directory:** Manage registered users and customer order histories.

---

## 🖼️ Screenshots Showcase

### 🌐 Customer Storefront

| Hero Banner & Featured | Product Catalog |
| :---: | :---: |
| ![Hero Banner](frontend/screenshots/home_hero.png) | ![Product Catalog](frontend/screenshots/home_catalogue.png) |

| Product Detail View | Interactive Cart Drawer |
| :---: | :---: |
| ![Product Details](frontend/screenshots/product_details.png) | ![Cart Drawer](frontend/screenshots/cart_drawer.png) |

| Checkout Page | Order Tracking |
| :---: | :---: |
| ![Checkout Page](frontend/screenshots/checkout_page.png) | ![Order Tracking](frontend/screenshots/order_tracking.png) |

| Men's Collection | Women's Collection | Kids' Collection |
| :---: | :---: | :---: |
| ![Men's](frontend/screenshots/mens_collection.png) | ![Women's](frontend/screenshots/womens_collection.png) | ![Kids'](frontend/screenshots/kids_collection.png) |

---

### 📊 Admin Control Center

| Admin Dashboard Analytics | Product Management |
| :---: | :---: |
| ![Admin Dashboard](frontend/screenshots/admin_dashboard.png) | ![Product Table](frontend/screenshots/admin_products_table.png) |

| Add / Edit Product | Order Management |
| :---: | :---: |
| ![Add Product](frontend/screenshots/admin_add_product.png) | ![Orders Table](frontend/screenshots/admin_orders_table.png) |

---

## 📐 System Architecture & UML

### 🔹 Use Case Diagram
![Use Case Diagram](frontend/screenshots/use_case_diagram.png)

### 🔹 Sequence Diagram
![Sequence Diagram](frontend/screenshots/sequence_diagram.png)

### 🔹 Class Diagram
![Class Diagram](frontend/screenshots/class_diagram.png)

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 19 (SPA architecture)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Styling:** Custom Modular CSS with CSS Variables & Glassmorphism design tokens

### **Backend**
- **Framework:** Laravel 12 API
- **Language:** PHP 8.2+
- **Authentication:** Laravel Sanctum
- **Database:** MySQL / SQLite
- **ORM:** Eloquent ORM

---

## 🚀 Getting Started

Follow these steps to set up and run SneakerStore locally.

### 📋 Prerequisites
- **PHP** >= 8.2 & Composer
- **Node.js** >= 18.x & npm
- **MySQL** or **SQLite**

---

### ⚙️ Backend Setup (`/backend`)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Set up Database & Run Migrations:**
   Ensure database parameters are set in `.env`, then execute:
   ```bash
   php artisan migrate --seed
   ```

5. **Start Laravel API Server:**
   ```bash
   php artisan serve
   ```
   *Backend API will run at `http://127.0.0.1:8000`*

---

### 🎨 Frontend Setup (`/frontend`)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install NPM dependencies:**
   ```bash
   npm install
   ```

3. **Start React Development Server:**
   ```bash
   npm start
   ```
   *Frontend application will open at `http://localhost:3000`*

---

## 📁 Repository Structure

```
SneakerStoreV1/
├── backend/                  # Laravel 12 REST API
│   ├── app/                  # Models, Controllers, Middleware
│   ├── config/               # Application & Auth configurations
│   ├── database/             # Migrations, Factories, Seeders
│   ├── routes/               # API routes (`api.php`)
│   └── storage/              # File storage & uploads
│
├── frontend/                 # React 19 Single Page Application
│   ├── public/               # Static web assets
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   ├── pages/            # Page Views (Home, Catalog, Admin, etc.)
│   │   ├── styles/           # CSS Modules & Stylesheets
│   │   └── utils/            # API helpers & storage management
│   └── screenshots/          # System design diagrams & UI screenshots
│
└── README.md                 # Project Documentation
```

---

## 👤 Author

**Yahya Allouz**
- **GitHub:** [@yahyaallouz](https://github.com/yahyaallouz)
- **Email:** yahyaallouz01@gmail.com

---

<div align="center">
  <sub>Built with ❤️ by Yahya Allouz</sub>
</div>
