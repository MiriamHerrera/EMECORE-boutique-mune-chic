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
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'mune_chic'}`
    );
    console.log('Database created or already exists');

    // Usar la base de datos
    await connection.execute(`USE ${process.env.DB_NAME || 'mune_chic'}`);

    // Crear tablas
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Categories table created');

    await connection.execute(`
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

    await connection.execute(`
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
      ['Vestidos', 'Elegantes vestidos para toda ocasión'],
      ['Blusas', 'Blusas modernas y casuales'],
      ['Pantalones', 'Pantalones cómodos y a la moda']
    ];

    for (const [name, description] of categories) {
      await connection.execute(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description]
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