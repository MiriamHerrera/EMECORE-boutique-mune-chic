-- Actualizar tabla categories
ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS image_url VARCHAR(255) AFTER description;

-- Actualizar tabla products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) NOT NULL DEFAULT 0.00 AFTER description,
  ADD COLUMN IF NOT EXISTS category_id INT AFTER price,
  ADD COLUMN IF NOT EXISTS subcategory_id INT AFTER category_id;

-- Actualizar tabla product_images
ALTER TABLE product_images
  ADD COLUMN IF NOT EXISTS url VARCHAR(255) NOT NULL AFTER product_id,
  ADD COLUMN IF NOT EXISTS is_main BOOLEAN DEFAULT false AFTER url;

-- Agregar foreign keys
ALTER TABLE products
  ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;

ALTER TABLE products
  ADD FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL; 