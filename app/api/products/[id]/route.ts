import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute(
      `SELECT p.*, 
        c.name as category_name,
        (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [params.id]
    );

    if (!(rows as any[]).length) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
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
  try {
    const body = await request.json();
    const { name, description, price, category_id } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre del producto es requerido' },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: 'El precio del producto es requerido y debe ser mayor a 0' },
        { status: 400 }
      );
    }

    if (!category_id) {
      return NextResponse.json(
        { error: 'La categoría del producto es requerida' },
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
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Verificar que la categoría existe
    const [category] = await pool.execute(
      'SELECT id FROM categories WHERE id = ?',
      [category_id]
    );

    if (!(category as any[]).length) {
      return NextResponse.json(
        { error: 'La categoría no existe' },
        { status: 404 }
      );
    }

    // Actualizar el producto
    await pool.execute(
      `UPDATE products 
      SET name = ?, description = ?, price = ?, category_id = ?
      WHERE id = ?`,
      [name.trim(), description ? description.trim() : null, price, category_id, params.id]
    );

    // Obtener el producto actualizado
    const [rows] = await pool.execute(
      `SELECT p.*, 
        c.name as category_name,
        (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [params.id]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
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
  try {
    // Verificar que el producto existe
    const [product] = await pool.execute(
      'SELECT id FROM products WHERE id = ?',
      [params.id]
    );

    if (!(product as any[]).length) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar el producto (las imágenes y valores de atributos se eliminarán en cascada)
    await pool.execute(
      'DELETE FROM products WHERE id = ?',
      [params.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el producto' },
      { status: 500 }
    );
  }
} 