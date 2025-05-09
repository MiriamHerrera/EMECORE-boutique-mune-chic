-- Eliminar la columna subcategory_id que no se usa
ALTER TABLE products DROP COLUMN subcategory_id;

-- Asegurarse de que la columna category_id sea NOT NULL
ALTER TABLE products MODIFY category_id INT NOT NULL;

-- Asegurarse de que la columna stock tenga un valor por defecto de 0
ALTER TABLE products MODIFY stock INT NOT NULL DEFAULT 0; 