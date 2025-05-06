require('dotenv').config();
const mysql = require('mysql2/promise');

async function initDatabase() {
  try {
    // Crear conexión sin base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Conectado al servidor MySQL');

    // Crear base de datos si no existe
    await connection.query('CREATE DATABASE IF NOT EXISTS mune_chic');
    console.log('Base de datos mune_chic creada o verificada');

    // Usar la base de datos
    await connection.query('USE mune_chic');
    console.log('Usando base de datos mune_chic');

    // Crear tablas
    const createTables = `
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
    `;

    // Ejecutar cada statement por separado
    const statements = createTables
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    for (const statement of statements) {
      await connection.query(statement);
      console.log('Statement ejecutado:', statement.split('\n')[0]);
    }

    console.log('Tablas creadas exitosamente');

    // Cerrar conexión
    await connection.end();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initDatabase(); 