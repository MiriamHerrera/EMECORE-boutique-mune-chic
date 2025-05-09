-- Agregar campos de género y tipo a la tabla de categorías
ALTER TABLE categories
ADD COLUMN gender ENUM('hombre', 'mujer', 'unisex') NOT NULL DEFAULT 'unisex',
ADD COLUMN type ENUM('ropa', 'calzado', 'accesorios') NOT NULL DEFAULT 'ropa';

-- Actualizar las categorías existentes
UPDATE categories SET 
gender = 'unisex',
type = 'ropa'
WHERE gender IS NULL OR type IS NULL; 