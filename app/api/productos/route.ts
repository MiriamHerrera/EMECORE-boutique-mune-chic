import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// GET /api/productos
export async function GET(request: Request) {
  const connection = await pool.getConnection();
  
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId');
    const offset = (page - 1) * limit;

    console.log('Fetching products with params:', { page, limit, search, categoryId });

    let query = `
      SELECT p.*, 
        c.name as category_name,
        (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1 = 1
    `;

    const params: any[] = [];

    if (search) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (categoryId) {
      query += ` AND p.category_id = ?`;
      params.push(categoryId);
    }

    // Obtener el total de productos
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM (${query}) as t`,
      params
    );
    const total = (countResult as any[])[0].total;

    console.log('Total products found:', total);

    // Obtener los productos paginados
    query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [products] = await connection.execute(query, params);
    console.log(`Retrieved ${(products as any[]).length} products`);

    connection.release();
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    connection.release();
    return NextResponse.json(
      { 
        error: 'Error al obtener los productos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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
          { error: 'Error al guardar la imagen', details: error instanceof Error ? error.message : 'Unknown error' },
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

    console.log('Product inserted successfully:', result);
    const productId = (result as any).insertId;

    // Obtener el producto creado
    const [rows] = await connection.execute(
      `SELECT p.*, 
        c.name as category_name,
        p.image_url as image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [productId]
    );

    console.log('Retrieved new product:', rows[0]);
    connection.release();
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    connection.release();
    return NextResponse.json(
      { 
        error: 'Error al crear el producto',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 