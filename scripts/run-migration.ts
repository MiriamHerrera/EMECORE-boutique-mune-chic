import { pool } from '../lib/db';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  try {
    // Read the migration file
    const migrationSQL = readFileSync(
      join(__dirname, '..', 'migrations', '001_create_categories_table.sql'),
      'utf8'
    );

    // Execute the migration
    await pool.query(migrationSQL);
    console.log('Migration completed successfully');

    // Close the pool
    await pool.end();
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  }
}

runMigration(); 