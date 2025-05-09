import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [params.id]
    );

    if (!(rows as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    connection.release();
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    const body = await request.json();
    const { name, description, price, stock, category_id } = body;

    // Validaciones
    if (!name || name.trim() === '') {
      connection.release();
      return NextResponse.json(
        { error: 'El nombre del producto es requerido' },
        { status: 400 }
      );
    }

    if (!price || isNaN(price) || price <= 0) {
      connection.release();
      return NextResponse.json(
        { error: 'El precio debe ser un número mayor a 0' },
        { status: 400 }
      );
    }

    if (!category_id) {
      connection.release();
      return NextResponse.json(
        { error: 'La categoría es requerida' },
        { status: 400 }
      );
    }

    // Verificar que el producto existe
    const [existingProduct] = await connection.execute(
      'SELECT id FROM products WHERE id = ?',
      [params.id]
    );

    if (!(existingProduct as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Verificar que la categoría existe
    const [category] = await connection.execute(
      'SELECT id FROM categories WHERE id = ?',
      [category_id]
    );

    if (!(category as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'La categoría seleccionada no existe' },
        { status: 400 }
      );
    }

    // Actualizar el producto
    await connection.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?',
      [name.trim(), description ? description.trim() : null, price, stock || 0, category_id, params.id]
    );

    // Obtener el producto actualizado
    const [rows] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [params.id]
    );

    connection.release();
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al actualizar el producto' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    // Verificar que el producto existe
    const [product] = await connection.execute(
      'SELECT id FROM products WHERE id = ?',
      [params.id]
    );

    if (!(product as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar el producto
    await connection.execute(
      'DELETE FROM products WHERE id = ?',
      [params.id]
    );

    connection.release();
    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting product:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al eliminar el producto' },
      { status: 500 }
    );
  }
} 