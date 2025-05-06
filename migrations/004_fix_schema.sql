-- Desactivar verificación de foreign keys
SET FOREIGN_KEY_CHECKS=0;

-- Eliminar foreign keys existentes
ALTER TABLE categories DROP FOREIGN KEY IF EXISTS categories_ibfk_1;
ALTER TABLE products DROP FOREIGN KEY IF EXISTS products_ibfk_1;
ALTER TABLE products DROP FOREIGN KEY IF EXISTS products_ibfk_2;

-- Actualizar tabla categories
ALTER TABLE categories
  DROP COLUMN parent_id;

-- Actualizar tabla products
ALTER TABLE products
  DROP COLUMN stock,
  ADD COLUMN category_id INT AFTER price,
  ADD COLUMN subcategory_id INT AFTER category_id;

-- Actualizar tabla product_images
ALTER TABLE product_images
  MODIFY COLUMN url VARCHAR(255) NOT NULL,
  ADD COLUMN is_main BOOLEAN DEFAULT false AFTER url;

-- Agregar foreign keys
ALTER TABLE products
  ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  ADD FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

-- Activar verificación de foreign keys
SET FOREIGN_KEY_CHECKS=1; 