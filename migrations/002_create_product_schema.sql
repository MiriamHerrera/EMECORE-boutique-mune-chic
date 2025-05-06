-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de subcategorías
CREATE TABLE IF NOT EXISTS subcategories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Crear tabla de atributos
CREATE TABLE IF NOT EXISTS attributes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('text', 'number', 'select', 'color', 'size') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de valores de atributos
CREATE TABLE IF NOT EXISTS attribute_values (
  id INT PRIMARY KEY AUTO_INCREMENT,
  attribute_id INT NOT NULL,
  value VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_attribute_value (attribute_id, value)
);

-- Crear tabla de relación entre categorías y atributos
CREATE TABLE IF NOT EXISTS category_attributes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  attribute_id INT NOT NULL,
  is_required BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_category_attribute (category_id, attribute_id)
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  subcategory_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL
);

-- Crear tabla de imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Crear tabla de valores de atributos de productos
CREATE TABLE IF NOT EXISTS product_attribute_values (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  attribute_id INT NOT NULL,
  value VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_product_attribute (product_id, attribute_id)
);

-- Crear tabla de variantes de productos
CREATE TABLE IF NOT EXISTS product_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  sku VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_sku (sku)
);

-- Crear tabla de valores de atributos de variantes
CREATE TABLE IF NOT EXISTS variant_attribute_values (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variant_id INT NOT NULL,
  attribute_id INT NOT NULL,
  value VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_variant_attribute (variant_id, attribute_id)
); 