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

async function testConnection() {
  const connection = await pool.getConnection();
  
  try {
    console.log('Conexión establecida correctamente');
    
    // Verificar si la base de datos existe
    const [databases] = await connection.execute('SHOW DATABASES');
    console.log('\nBases de datos disponibles:');
    console.table(databases);
    
    // Verificar si la tabla categories existe
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\nTablas en la base de datos:');
    console.table(tables);
    
    if (tables.length > 0) {
      // Verificar la estructura de la tabla categories
      const [columns] = await connection.execute('DESCRIBE categories');
      console.log('\nEstructura de la tabla categories:');
      console.table(columns);
      
      // Verificar si hay datos en la tabla
      const [count] = await connection.execute('SELECT COUNT(*) as count FROM categories');
      console.log('\nNúmero de categorías:', count[0].count);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

testConnection().catch(console.error); 