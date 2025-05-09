const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mune_chic',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true // Permitir múltiples sentencias SQL
});

async function runMigrations() {
  const connection = await pool.getConnection();
  
  try {
    // Crear tabla de migraciones si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Obtener migraciones ejecutadas
    const [executedMigrations] = await connection.execute(
      'SELECT name FROM migrations'
    );
    const executedMigrationNames = (executedMigrations as any[]).map(m => m.name);

    // Leer archivos de migración
    const migrationsDir = path.join(process.cwd(), 'migrations');
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files
      .filter((f: string) => f.endsWith('.sql'))
      .sort();

    // Ejecutar migraciones pendientes
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        console.log(`Ejecutando migración: ${file}`);
        const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
        
        // Ejecutar la migración
        await connection.query(sql); // Usar query en lugar de execute para múltiples sentencias
        
        // Registrar la migración
        await connection.execute(
          'INSERT INTO migrations (name) VALUES (?)',
          [file]
        );
        
        console.log(`Migración ${file} completada`);
      }
    }

    console.log('Todas las migraciones han sido ejecutadas');
  } catch (error) {
    console.error('Error ejecutando migraciones:', error);
    throw error;
  } finally {
    connection.release();
  }
}

runMigrations().catch(console.error); 