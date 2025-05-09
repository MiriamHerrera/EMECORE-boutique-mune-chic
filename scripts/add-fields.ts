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

async function addFields() {
  const connection = await pool.getConnection();
  
  try {
    console.log('Agregando campos gender y type a la tabla categories...');
    
    await connection.execute(`
      ALTER TABLE categories 
      ADD COLUMN gender ENUM('hombre', 'mujer', 'unisex') NOT NULL DEFAULT 'unisex',
      ADD COLUMN type ENUM('ropa', 'calzado', 'accesorios') NOT NULL DEFAULT 'ropa'
    `);
    
    console.log('Campos agregados correctamente');
    
    // Verificar la estructura de la tabla
    const [rows] = await connection.execute('DESCRIBE categories');
    console.log('\nEstructura actualizada de la tabla categories:');
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.release();
  }
}

addFields().catch(console.error); 