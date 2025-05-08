-- Actualizar contraseña del usuario administrador
-- La nueva contraseña es 'admin123' (hasheada)
UPDATE users 
SET password = '$2a$10$Ycf4HqUl4DPXj/GUXvEReuYAJwunHjFJQ/DqzY0L1bv/jHZjGPv62'
WHERE email = 'admin@munechic.com'; 