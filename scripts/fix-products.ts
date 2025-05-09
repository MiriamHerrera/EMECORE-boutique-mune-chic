const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mune_chic',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

async function fixProductsTable() {
  const connection = await pool.getConnection();
  
  try {
    console.log('Corrigiendo estructura de la tabla products...');
    
    // Eliminar la columna subcategory_id
    await connection.execute('ALTER TABLE products DROP COLUMN subcategory_id');
    console.log('Columna subcategory_id eliminada');
    
    // Modificar category_id a NOT NULL
    await connection.execute('ALTER TABLE products MODIFY category_id INT NOT NULL');
    console.log('Columna category_id modificada a NOT NULL');
    
    // Modificar stock a NOT NULL DEFAULT 0
    await connection.execute('ALTER TABLE products MODIFY stock INT NOT NULL DEFAULT 0');
    console.log('Columna stock modificada a NOT NULL DEFAULT 0');
    
    // Verificar la estructura actualizada
    const [columns] = await connection.execute('DESCRIBE products');
    console.log('\nEstructura actualizada de la tabla products:');
    console.table(columns);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

fixProductsTable().catch(console.error); 