CREATE DATABASE IF NOT EXISTS sneaker_store;
USE sneaker_store;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  sizes JSON, -- Storing sizes as a JSON array e.g., '[7, 8, 9]'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tracking_number VARCHAR(50) UNIQUE,
  user_email VARCHAR(255) NOT NULL, -- Storing email directly for guest checkout simplicity or linked user
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('Pending', 'Shipped', 'Delivered', 'Refunded') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert Default Admin (Password: admin123)
-- Hash generated using bcrypt for 'admin123'
INSERT INTO users (email, password_hash, role) 
VALUES ('admin@sneaker.com', '$2b$10$X7.X.X.X.X.X.X.X.X.X.X', 'admin') 
ON DUPLICATE KEY UPDATE role='admin';
