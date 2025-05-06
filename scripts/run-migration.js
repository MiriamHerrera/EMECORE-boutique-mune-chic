const { pool } = require('../lib/db');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    // Leer el archivo de migración
    const migrationPath = path.join(__dirname, '../migrations/005_final_fixes.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Dividir el SQL en statements individuales
    const statements = migrationSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    // Ejecutar cada statement por separado
    console.log('Ejecutando migración...');
    for (const statement of statements) {
      await pool.query(statement);
      console.log('Statement ejecutado:', statement.split('\n')[0]);
    }
    console.log('Migración completada exitosamente');

    // Cerrar la conexión
    await pool.end();
  } catch (error) {
    console.error('Error al ejecutar la migración:', error);
    process.exit(1);
  }
}

runMigration(); 