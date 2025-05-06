-- Insertar usuario administrador
-- La contraseña es 'admin123' (hasheada)
INSERT INTO users (email, password, first_name, last_name, role)
VALUES (
  'admin@munechic.com',
  '$2a$10$W2UkQ..VoQq549XnjPDu6uVvQ.8fxeNwrmR3k.93IwcQKmECM0V8e',
  'Admin',
  'Mune Chic',
  'admin'
); 