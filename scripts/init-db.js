require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    // Crear base de datos
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'mune_chic'}`
    );
    console.log('Database created or already exists');

    // Usar la base de datos
    await connection.query(`USE ${process.env.DB_NAME || 'mune_chic'}`);

    // Crear tablas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        gender ENUM('hombre', 'mujer', 'unisex') NOT NULL DEFAULT 'unisex',
        type ENUM('ropa', 'calzado', 'accesorios') NOT NULL DEFAULT 'ropa',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Categories table created');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
    console.log('Products table created');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        is_main BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    console.log('Product images table created');

    // Insertar categorías de ejemplo
    const categories = [
      ['Vestidos', 'Elegantes vestidos para toda ocasión', 'mujer', 'ropa'],
      ['Blusas', 'Blusas modernas y casuales', 'mujer', 'ropa'],
      ['Pantalones', 'Pantalones cómodos y a la moda', 'unisex', 'ropa']
    ];

    for (const [name, description, gender, type] of categories) {
      await connection.query(
        'INSERT INTO categories (name, description, gender, type) VALUES (?, ?, ?, ?)',
        [name, description, gender, type]
      );
    }
    console.log('Sample categories inserted');

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

main(); 