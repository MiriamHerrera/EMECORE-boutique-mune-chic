require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkDatabase() {
  try {
    // Crear conexión sin base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Conectado al servidor MySQL');

    // Verificar que la base de datos existe
    const [databases] = await connection.query('SHOW DATABASES');
    console.log('\nBases de datos disponibles:');
    databases.forEach(db => console.log(`- ${db.Database}`));

    // Seleccionar la base de datos
    await connection.query('USE mune_chic');
    console.log('\nUsando base de datos: mune_chic');

    // Mostrar todas las tablas
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\nTablas en la base de datos:');
    tables.forEach(table => console.log(`- ${Object.values(table)[0]}`));

    // Mostrar estructura de las tablas principales
    const mainTables = ['categories', 'products', 'product_images'];
    for (const table of mainTables) {
      console.log(`\nEstructura de la tabla ${table}:`);
      const [columns] = await connection.query(`DESCRIBE ${table}`);
      columns.forEach(column => {
        console.log(`- ${column.Field}: ${column.Type} ${column.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${column.Default ? `DEFAULT ${column.Default}` : ''}`);
      });
    }

    await connection.end();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase(); 