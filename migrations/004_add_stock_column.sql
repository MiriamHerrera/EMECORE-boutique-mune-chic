-- Agregar columna stock si no existe
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 0; 