import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/categories
export async function GET() {
  const connection = await pool.getConnection();
  console.log('Database connection established for GET /api/categories');
  
  try {
    console.log('Executing categories query...');
    const [categories] = await connection.execute(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM products WHERE category_id = c.id) as product_count
      FROM categories c
      ORDER BY c.gender, c.type, c.name ASC
    `);
    console.log('Categories query executed successfully');
    console.log('Found categories:', categories);

    connection.release();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    connection.release();
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
    const { name, description, gender, type } = body;

    console.log('Received category data:', { name, description, gender, type });

    // Validación de datos
    if (!name || name.trim() === '') {
      console.log('Validation failed: Name is required');
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    if (!gender || !['hombre', 'mujer', 'unisex'].includes(gender)) {
      return NextResponse.json(
        { error: 'El género es requerido y debe ser hombre, mujer o unisex' },
        { status: 400 }
      );
    }

    if (!type || !['ropa', 'calzado', 'accesorios'].includes(type)) {
      return NextResponse.json(
        { error: 'El tipo es requerido y debe ser ropa, calzado o accesorios' },
        { status: 400 }
      );
    }

    // Verificar conexión a la base de datos
    const connection = await pool.getConnection();
    console.log('Database connection established');

    try {
      // Insertar la categoría
      const [result] = await connection.execute(
        'INSERT INTO categories (name, description, gender, type) VALUES (?, ?, ?, ?)',
        [name.trim(), description ? description.trim() : null, gender, type]
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