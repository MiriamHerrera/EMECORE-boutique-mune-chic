import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/categories
export async function GET() {
  try {
    const [categories] = await pool.execute(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM subcategories WHERE category_id = c.id) as subcategory_count,
        (SELECT COUNT(*) FROM products WHERE category_id = c.id) as product_count
      FROM categories c
      ORDER BY c.name ASC
    `);

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    );
  }
}

// POST /api/categories
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, image_url } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)',
      [name.trim(), description ? description.trim() : null, image_url || null]
    );

    const insertId = (result as any).insertId;

    const [rows] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [insertId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Error al crear la categoría' },
      { status: 500 }
    );
  }
} 