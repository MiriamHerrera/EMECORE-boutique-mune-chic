require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function runMigration() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mune_chic'
  });

  try {
    // Leer el archivo SQL
    const sql = await fs.readFile(
      path.join(__dirname, '..', 'migrations', '004_add_stock_column.sql'),
      'utf8'
    );

    // Ejecutar la migración
    await connection.execute(sql);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    await connection.end();
  }
}

runMigration(); 