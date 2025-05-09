import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// GET /api/productos/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.execute(
      `SELECT p.*, 
        c.name as category_name,
        p.image_url as image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
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

// PUT /api/productos/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await pool.getConnection();
  
  try {
    console.log('Starting product update for ID:', params.id);
    
    const formData = await request.formData();
    console.log('FormData entries:', Array.from(formData.entries()));
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category_id = formData.get('category_id') as string;
    const stock = parseInt(formData.get('stock') as string || '0');
    const image = formData.get('image') as File | null;

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
        { error: 'El precio del producto es requerido y debe ser mayor a 0' },
        { status: 400 }
      );
    }

    if (!category_id) {
      connection.release();
      return NextResponse.json(
        { error: 'La categoría del producto es requerida' },
        { status: 400 }
      );
    }

    // Verificar que el producto existe
    const [existingProduct] = await connection.execute(
      'SELECT image_url FROM products WHERE id = ?',
      [params.id]
    );

    if (!(existingProduct as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    let image_url = (existingProduct as any[])[0].image_url;

    // Procesar la imagen si se proporcionó una nueva
    if (image) {
      try {
        console.log('Processing new image:', image.name);
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Crear nombre único para la imagen
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = image.name.split('.').pop();
        const filename = `product-${uniqueSuffix}.${extension}`;

        // Asegurarse de que el directorio uploads existe
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }

        // Guardar la nueva imagen
        const filePath = join(uploadDir, filename);
        await writeFile(filePath, buffer);
        image_url = `/uploads/${filename}`;
        
        console.log('New image saved:', image_url);
      } catch (error) {
        console.error('Error saving new image:', error);
        connection.release();
        return NextResponse.json(
          { error: 'Error al guardar la imagen' },
          { status: 500 }
        );
      }
    }

    // Actualizar el producto
    await connection.execute(
      `UPDATE products 
       SET name = ?, description = ?, price = ?, category_id = ?, stock = ?, image_url = ?
       WHERE id = ?`,
      [name.trim(), description ? description.trim() : null, price, category_id, stock, image_url, params.id]
    );

    // Obtener el producto actualizado
    const [rows] = await connection.execute(
      `SELECT p.*, 
        c.name as category_name,
        p.image_url as image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [params.id]
    );

    console.log('Product updated successfully:', rows[0]);
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

// DELETE /api/productos/[id]
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