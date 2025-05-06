import { pool } from '~/lib/db';
import type { Product } from '~/types/product';
import type { RowDataPacket } from 'mysql2';

export async function getProducts(): Promise<Product[]> {
  const [rows] = await pool.query<(Product & RowDataPacket)[]>(`
    SELECT p.*, 
      c.name as category_name,
      (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `);

  return rows;
}

export async function getProductById(id: string): Promise<Product | null> {
  const [rows] = await pool.query<(Product & RowDataPacket)[]>(
    `SELECT p.*, 
      c.name as category_name,
      (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?`,
    [id]
  );

  return rows[0] || null;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const [rows] = await pool.query<(Product & RowDataPacket)[]>(
    `SELECT p.*, 
      c.name as category_name,
      (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.category_id = ?
    ORDER BY p.created_at DESC`,
    [categoryId]
  );

  return rows;
} 