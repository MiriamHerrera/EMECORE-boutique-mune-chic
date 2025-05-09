const mysql = require('mysql2/promise');

async function addColumns() {
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

  const connection = await pool.getConnection();
  
  try {
    console.log('Agregando columnas gender y type a la tabla categories...');
    
    await connection.execute(`
      ALTER TABLE categories 
      ADD COLUMN gender ENUM('hombre', 'mujer', 'unisex') NOT NULL DEFAULT 'unisex',
      ADD COLUMN type ENUM('ropa', 'calzado', 'accesorios') NOT NULL DEFAULT 'ropa'
    `);
    
    console.log('Columnas agregadas correctamente');
    
    // Verificar la estructura actualizada
    const [columns] = await connection.execute('DESCRIBE categories');
    console.log('\nEstructura actualizada de la tabla categories:');
    console.table(columns);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

addColumns().catch(console.error); 