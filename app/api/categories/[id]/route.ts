import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/categories/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM categories WHERE id = ?',
      [params.id]
    );

    if (!(rows as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    connection.release();
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching category:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al obtener la categoría' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    const body = await request.json();
    const { name, description, gender, type } = body;

    // Validaciones
    if (!name || name.trim() === '') {
      connection.release();
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    if (!gender || !['hombre', 'mujer', 'unisex'].includes(gender)) {
      connection.release();
      return NextResponse.json(
        { error: 'El género es requerido y debe ser hombre, mujer o unisex' },
        { status: 400 }
      );
    }

    if (!type || !['ropa', 'calzado', 'accesorios'].includes(type)) {
      connection.release();
      return NextResponse.json(
        { error: 'El tipo es requerido y debe ser ropa, calzado o accesorios' },
        { status: 400 }
      );
    }

    // Verificar que la categoría existe
    const [existingCategory] = await connection.execute(
      'SELECT id FROM categories WHERE id = ?',
      [params.id]
    );

    if (!(existingCategory as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    // Actualizar la categoría
    await connection.execute(
      'UPDATE categories SET name = ?, description = ?, gender = ?, type = ? WHERE id = ?',
      [name.trim(), description ? description.trim() : null, gender, type, params.id]
    );

    // Obtener la categoría actualizada
    const [rows] = await connection.execute(
      'SELECT * FROM categories WHERE id = ?',
      [params.id]
    );

    connection.release();
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error updating category:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al actualizar la categoría' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    // Verificar que la categoría existe
    const [category] = await connection.execute(
      'SELECT id FROM categories WHERE id = ?',
      [params.id]
    );

    if (!(category as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    // Verificar si hay productos asociados
    const [products] = await connection.execute(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
      [params.id]
    );

    if ((products as any[])[0].count > 0) {
      connection.release();
      return NextResponse.json(
        { error: 'No se puede eliminar la categoría porque tiene productos asociados' },
        { status: 400 }
      );
    }

    // Eliminar la categoría
    await connection.execute(
      'DELETE FROM categories WHERE id = ?',
      [params.id]
    );

    connection.release();
    return NextResponse.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting category:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al eliminar la categoría' },
      { status: 500 }
    );
  }
} 