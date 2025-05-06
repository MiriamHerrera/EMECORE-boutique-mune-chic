import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/products/[id]/variants/[variantId]/images
export async function GET(
  request: Request,
  { params }: { params: { id: string; variantId: string } }
) {
  try {
    const [images] = await pool.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC',
      [params.variantId]
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching variant images:', error);
    return NextResponse.json(
      { error: 'Error al obtener las imágenes de la variante' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/variants/[variantId]/images
export async function POST(
  request: Request,
  { params }: { params: { id: string; variantId: string } }
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

    // Verificar que la variante existe y pertenece al producto
    const [variant] = await pool.execute(
      'SELECT id FROM product_variants WHERE id = ? AND product_id = ?',
      [params.variantId, params.id]
    );

    if (!(variant as any[]).length) {
      return NextResponse.json(
        { error: 'La variante no existe o no pertenece al producto' },
        { status: 404 }
      );
    }

    // Si esta imagen es la principal, desmarcar las demás
    if (is_main) {
      await pool.execute(
        'UPDATE product_images SET is_main = false WHERE product_id = ?',
        [params.variantId]
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO product_images (product_id, url, is_main) VALUES (?, ?, ?)',
      [params.variantId, url.trim(), is_main || false]
    );

    const insertId = (result as any).insertId;

    const [rows] = await pool.execute(
      'SELECT * FROM product_images WHERE id = ?',
      [insertId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating variant image:', error);
    return NextResponse.json(
      { error: 'Error al crear la imagen de la variante' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/variants/[variantId]/images/[imageId]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; variantId: string; imageId: string } }
) {
  try {
    // Verificar que la imagen existe y pertenece a la variante
    const [image] = await pool.execute(
      'SELECT id, is_main FROM product_images WHERE id = ? AND product_id = ?',
      [params.imageId, params.variantId]
    );

    if (!(image as any[]).length) {
      return NextResponse.json(
        { error: 'La imagen no existe o no pertenece a la variante' },
        { status: 404 }
      );
    }

    // Si la imagen es la principal, no permitir eliminarla
    if ((image as any[])[0].is_main) {
      return NextResponse.json(
        { error: 'No se puede eliminar la imagen principal de la variante' },
        { status: 400 }
      );
    }

    await pool.execute(
      'DELETE FROM product_images WHERE id = ?',
      [params.imageId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting variant image:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la imagen de la variante' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]/variants/[variantId]/images/[imageId]/main
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; variantId: string; imageId: string } }
) {
  try {
    // Verificar que la imagen existe y pertenece a la variante
    const [image] = await pool.execute(
      'SELECT id FROM product_images WHERE id = ? AND product_id = ?',
      [params.imageId, params.variantId]
    );

    if (!(image as any[]).length) {
      return NextResponse.json(
        { error: 'La imagen no existe o no pertenece a la variante' },
        { status: 404 }
      );
    }

    // Desmarcar todas las imágenes como principales
    await pool.execute(
      'UPDATE product_images SET is_main = false WHERE product_id = ?',
      [params.variantId]
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
    console.error('Error updating variant image:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la imagen de la variante' },
      { status: 500 }
    );
  }
} 