import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mune_chic',
  password: 'postgres',
  port: 5432,
}); 