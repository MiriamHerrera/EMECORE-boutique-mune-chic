import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// GET /api/productos
export async function GET(request: Request) {
  const connection = await pool.getConnection();
  
  try {
    const [products] = await connection.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    connection.release();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}

// POST /api/productos
export async function POST(request: Request) {
  const connection = await pool.getConnection();
  
  try {
    console.log('Starting product creation...');
    
    // Parse form data
    const formData = await request.formData();
    console.log('FormData entries:', Array.from(formData.entries()));
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category_id = formData.get('category_id') as string;
    const stock = parseInt(formData.get('stock') as string || '0');
    const image = formData.get('image') as File | null;

    console.log('Parsed form data:', {
      name,
      description,
      price,
      category_id,
      stock,
      hasImage: !!image
    });

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

    // Verificar que la categoría existe
    console.log('Checking if category exists:', category_id);
    const [category] = await connection.execute(
      'SELECT id FROM categories WHERE id = ?',
      [category_id]
    );
    console.log('Category check result:', category);

    if (!(category as any[]).length) {
      connection.release();
      return NextResponse.json(
        { error: 'La categoría no existe' },
        { status: 404 }
      );
    }

    let image_url = null;

    // Procesar la imagen si existe
    if (image) {
      try {
        console.log('Processing image:', image.name);
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Crear nombre único para la imagen
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = image.name.split('.').pop();
        const filename = `product-${uniqueSuffix}.${extension}`;

        // Asegurarse de que el directorio uploads existe
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        console.log('Upload directory:', uploadDir);
        
        if (!existsSync(uploadDir)) {
          console.log('Creating upload directory...');
          await mkdir(uploadDir, { recursive: true });
        }

        // Guardar la imagen
        const filePath = join(uploadDir, filename);
        console.log('Saving image to:', filePath);
        await writeFile(filePath, buffer);
        image_url = `/uploads/${filename}`;
        
        console.log('Image saved successfully:', image_url);
      } catch (error) {
        console.error('Error saving image:', error);
        connection.release();
        return NextResponse.json(
          { error: 'Error al guardar la imagen' },
          { status: 500 }
        );
      }
    }

    // Crear el producto
    console.log('Creating product in database with data:', {
      name: name.trim(),
      description: description ? description.trim() : null,
      price,
      category_id,
      stock,
      image_url
    });

    const [result] = await connection.execute(
      'INSERT INTO products (name, description, price, category_id, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name.trim(), description ? description.trim() : null, price, category_id, stock, image_url]
    );

    // Obtener el producto creado con su información de categoría
    const [newProduct] = await connection.execute(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [(result as any).insertId]
    );

    console.log('Product created successfully:', newProduct[0]);
    connection.release();
    return NextResponse.json(newProduct[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 