const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mune_chic',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function checkProducts() {
  const connection = await pool.getConnection();
  
  try {
    console.log('Verificando estructura de la tabla products...');
    
    const [columns] = await connection.execute('DESCRIBE products');
    console.log('\nEstructura de la tabla products:');
    console.table(columns);
    
    console.log('\nVerificando productos existentes...');
    const [products] = await connection.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    
    console.log('\nProductos en la base de datos:');
    console.table(products);
    
    if (products.length === 0) {
      console.log('\n¡No hay productos registrados!');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

checkProducts().catch(console.error); 