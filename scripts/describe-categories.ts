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

async function describeCategories() {
  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.execute('DESCRIBE categories');
    console.log('Estructura de la tabla categories:');
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.release();
  }
}

describeCategories().catch(console.error); 