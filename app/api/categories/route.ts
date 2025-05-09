import { NextResponse } from 'next/server';
import pool from '@/lib/db';

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

    console.log('Received category data:', { name, description, image_url });

    // Validación de datos
    if (!name || name.trim() === '') {
      console.log('Validation failed: Name is required');
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    // Verificar conexión a la base de datos
    const connection = await pool.getConnection();
    console.log('Database connection established');

    try {
      // Insertar la categoría
      const [result] = await connection.execute(
        'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)',
        [name.trim(), description ? description.trim() : null, image_url || null]
      );
      console.log('Category inserted successfully:', result);

      const insertId = (result as any).insertId;

      // Obtener la categoría recién creada
      const [rows] = await connection.execute(
        'SELECT * FROM categories WHERE id = ?',
        [insertId]
      );
      console.log('Retrieved new category:', rows[0]);

      connection.release();
      return NextResponse.json(rows[0]);
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      connection.release();
      throw dbError;
    }
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { 
        error: 'Error al crear la categoría',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 