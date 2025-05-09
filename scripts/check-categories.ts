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

async function checkCategories() {
  const connection = await pool.getConnection();
  
  try {
    console.log('Verificando categorías existentes...');
    
    const [categories] = await connection.execute(`
      SELECT id, name, gender, type, created_at 
      FROM categories 
      ORDER BY created_at DESC
    `);
    
    console.log('\nCategorías en la base de datos:');
    console.table(categories);
    
    if (categories.length === 0) {
      console.log('\n¡No hay categorías registradas!');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

checkCategories().catch(console.error); 