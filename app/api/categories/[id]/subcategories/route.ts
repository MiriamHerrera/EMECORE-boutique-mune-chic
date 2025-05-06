import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/categories/[id]/subcategories
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [subcategories] = await pool.execute(
      `SELECT s.*, 
        (SELECT COUNT(*) FROM products WHERE subcategory_id = s.id) as product_count
      FROM subcategories s
      WHERE s.category_id = ?
      ORDER BY s.name ASC`,
      [params.id]
    );

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { error: 'Error al obtener las subcategorías' },
      { status: 500 }
    );
  }
}

// POST /api/categories/[id]/subcategories
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, image_url } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre de la subcategoría es requerido' },
        { status: 400 }
      );
    }

    // Verificar que la categoría existe
    const [category] = await pool.execute(
      'SELECT id FROM categories WHERE id = ?',
      [params.id]
    );

    if (!(category as any[]).length) {
      return NextResponse.json(
        { error: 'La categoría no existe' },
        { status: 404 }
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO subcategories (category_id, name, description, image_url) VALUES (?, ?, ?, ?)',
      [params.id, name.trim(), description ? description.trim() : null, image_url || null]
    );

    const insertId = (result as any).insertId;

    const [rows] = await pool.execute(
      'SELECT * FROM subcategories WHERE id = ?',
      [insertId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json(
      { error: 'Error al crear la subcategoría' },
      { status: 500 }
    );
  }
} 