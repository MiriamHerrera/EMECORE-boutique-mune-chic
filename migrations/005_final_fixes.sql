-- Desactivar verificación de foreign keys
SET FOREIGN_KEY_CHECKS=0;

-- Eliminar foreign keys existentes
ALTER TABLE products DROP FOREIGN KEY IF EXISTS products_ibfk_1;
ALTER TABLE products DROP FOREIGN KEY IF EXISTS products_ibfk_2;

-- Actualizar tabla products
ALTER TABLE products
  DROP COLUMN stock,
  DROP COLUMN image_url;

-- Actualizar tabla product_images
ALTER TABLE product_images
  DROP COLUMN image_url,
  ADD COLUMN is_main BOOLEAN DEFAULT false AFTER url;

-- Agregar foreign keys
ALTER TABLE products
  ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  ADD FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

-- Activar verificación de foreign keys
SET FOREIGN_KEY_CHECKS=1; 