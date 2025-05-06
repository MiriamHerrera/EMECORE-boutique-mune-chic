import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE id = ?',
      [params.id]
    );
    
    if (!(rows as any[]).length) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json((rows as any[])[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Error al obtener producto' }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, stock, category_id, image_url } = body;

    const [result] = await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, image_url = ? WHERE id = ?',
      [name, description, price, stock, category_id, image_url, params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ id: params.id, ...body });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const [result] = await pool.execute(
      'DELETE FROM products WHERE id = ?',
      [params.id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
} 