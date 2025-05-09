-- Verificar y corregir la estructura de la tabla products
ALTER TABLE products MODIFY COLUMN name VARCHAR(255) NOT NULL;
ALTER TABLE products MODIFY COLUMN price DECIMAL(10, 2) NOT NULL;
ALTER TABLE products MODIFY COLUMN stock INT DEFAULT 0;
ALTER TABLE products MODIFY COLUMN category_id INT;
ALTER TABLE products MODIFY COLUMN image_url VARCHAR(255) DEFAULT NULL;

-- Asegurarse de que existen los índices y foreign keys
ALTER TABLE products ADD FOREIGN KEY IF NOT EXISTS (category_id) REFERENCES categories(id) ON DELETE SET NULL; 