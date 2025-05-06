import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/products/[id]/images
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [images] = await pool.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC',
      [params.id]
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching product images:', error);
    return NextResponse.json(
      { error: 'Error al obtener las imágenes del producto' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/images
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { url, is_main } = body;

    if (!url || url.trim() === '') {
      return NextResponse.json(
        { error: 'La URL de la imagen es requerida' },
        { status: 400 }
      );
    }

    // Verificar que el producto existe
    const [product] = await pool.execute(
      'SELECT id FROM products WHERE id = ?',
      [params.id]
    );

    if (!(product as any[]).length) {
      return NextResponse.json(
        { error: 'El producto no existe' },
        { status: 404 }
      );
    }

    // Si esta imagen es la principal, desmarcar las demás
    if (is_main) {
      await pool.execute(
        'UPDATE product_images SET is_main = false WHERE product_id = ?',
        [params.id]
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO product_images (product_id, url, is_main) VALUES (?, ?, ?)',
      [params.id, url.trim(), is_main || false]
    );

    const insertId = (result as any).insertId;

    const [rows] = await pool.execute(
      'SELECT * FROM product_images WHERE id = ?',
      [insertId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating product image:', error);
    return NextResponse.json(
      { error: 'Error al crear la imagen del producto' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/images/[imageId]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    // Verificar que la imagen existe y pertenece al producto
    const [image] = await pool.execute(
      'SELECT id, is_main FROM product_images WHERE id = ? AND product_id = ?',
      [params.imageId, params.id]
    );

    if (!(image as any[]).length) {
      return NextResponse.json(
        { error: 'La imagen no existe o no pertenece al producto' },
        { status: 404 }
      );
    }

    // Si la imagen es la principal, no permitir eliminarla
    if ((image as any[])[0].is_main) {
      return NextResponse.json(
        { error: 'No se puede eliminar la imagen principal del producto' },
        { status: 400 }
      );
    }

    await pool.execute(
      'DELETE FROM product_images WHERE id = ?',
      [params.imageId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product image:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la imagen del producto' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]/images/[imageId]/main
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    // Verificar que la imagen existe y pertenece al producto
    const [image] = await pool.execute(
      'SELECT id FROM product_images WHERE id = ? AND product_id = ?',
      [params.imageId, params.id]
    );

    if (!(image as any[]).length) {
      return NextResponse.json(
        { error: 'La imagen no existe o no pertenece al producto' },
        { status: 404 }
      );
    }

    // Desmarcar todas las imágenes como principales
    await pool.execute(
      'UPDATE product_images SET is_main = false WHERE product_id = ?',
      [params.id]
    );

    // Marcar la imagen seleccionada como principal
    await pool.execute(
      'UPDATE product_images SET is_main = true WHERE id = ?',
      [params.imageId]
    );

    const [rows] = await pool.execute(
      'SELECT * FROM product_images WHERE id = ?',
      [params.imageId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error updating product image:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la imagen del producto' },
      { status: 500 }
    );
  }
} 