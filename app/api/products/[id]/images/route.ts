import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { pool } from '@/lib/db';

const UPLOAD_DIR = 'public/uploads/products';

// Asegurarse de que el directorio de carga existe
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
  }
}

// GET /api/products/[id]/images
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC',
      [params.id]
    );

    return NextResponse.json(rows);
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
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const isMain = formData.get('isMain') === 'true';

    if (!files.length) {
      return NextResponse.json(
        { error: 'No se han proporcionado imágenes' },
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

    await ensureUploadDir();

    const savedImages = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const filepath = join(UPLOAD_DIR, filename);
      
      await writeFile(filepath, buffer);

    const [result] = await pool.execute(
      'INSERT INTO product_images (product_id, url, is_main) VALUES (?, ?, ?)',
        [params.id, `/uploads/products/${filename}`, isMain && savedImages.length === 0]
    );

      savedImages.push({
        id: (result as any).insertId,
        url: `/uploads/products/${filename}`,
        is_main: isMain && savedImages.length === 0
      });
    }

    return NextResponse.json(savedImages);
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { error: 'Error al subir las imágenes' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id]/images/[imageId]
export async function PUT(
  request: Request,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const { is_main } = await request.json();

    // Verificar que la imagen existe y pertenece al producto
    const [image] = await pool.execute(
      'SELECT id FROM product_images WHERE id = ? AND product_id = ?',
      [params.imageId, params.id]
    );

    if (!(image as any[]).length) {
      return NextResponse.json(
        { error: 'Imagen no encontrada' },
        { status: 404 }
      );
    }

    if (is_main) {
      // Quitar el estado principal de otras imágenes
      await pool.execute(
        'UPDATE product_images SET is_main = false WHERE product_id = ?',
        [params.id]
      );
    }

    // Actualizar la imagen
    await pool.execute(
      'UPDATE product_images SET is_main = ? WHERE id = ?',
      [is_main, params.imageId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la imagen' },
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
      'SELECT id, url, is_main FROM product_images WHERE id = ? AND product_id = ?',
      [params.imageId, params.id]
    );

    if (!(image as any[]).length) {
      return NextResponse.json(
        { error: 'Imagen no encontrada' },
        { status: 404 }
      );
    }

    const imageData = (image as any[])[0];

    // Si es la imagen principal y hay otras imágenes, hacer la siguiente imagen la principal
    if (imageData.is_main) {
      const [nextImage] = await pool.execute(
        'SELECT id FROM product_images WHERE product_id = ? AND id != ? LIMIT 1',
        [params.id, params.imageId]
      );

      if ((nextImage as any[]).length) {
    await pool.execute(
          'UPDATE product_images SET is_main = true WHERE id = ?',
          [(nextImage as any[])[0].id]
    );
      }
    }

    // Eliminar la imagen de la base de datos
    await pool.execute(
      'DELETE FROM product_images WHERE id = ?',
      [params.imageId]
    );

    // Intentar eliminar el archivo físico
    try {
      const filepath = join(process.cwd(), 'public', imageData.url);
      await unlink(filepath);
    } catch (error) {
      console.error('Error deleting image file:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la imagen' },
      { status: 500 }
    );
  }
} 