const { pool } = require('../lib/db');

async function checkTables() {
  try {
    console.log('Verificando tablas...');
    
    const [tables] = await pool.query('SHOW TABLES');
    console.log('\nTablas encontradas:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`- ${tableName}`);
    });

    // Verificar estructura de la tabla product_images
    console.log('\nEstructura detallada de product_images:');
    const [columns] = await pool.query('SHOW COLUMNS FROM product_images');
    columns.forEach(column => {
      console.log(`- ${column.Field}: ${column.Type} ${column.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${column.Default ? `DEFAULT ${column.Default}` : ''}`);
    });

    // Verificar foreign keys de product_images
    console.log('\nForeign keys de product_images:');
    const [foreignKeys] = await pool.query(`
      SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'product_images'
        AND REFERENCED_TABLE_NAME IS NOT NULL;
    `);
    foreignKeys.forEach(fk => {
      console.log(`- ${fk.CONSTRAINT_NAME}: ${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}(${fk.REFERENCED_COLUMN_NAME})`);
    });

    await pool.end();
  } catch (error) {
    console.error('Error al verificar las tablas:', error);
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.log('La tabla product_images no existe. Necesitas ejecutar las migraciones primero.');
    }
    process.exit(1);
  }
}

checkTables(); 