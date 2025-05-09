import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/products
export async function GET(request: Request) {
  const connection = await pool.getConnection();
  
  try {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('category_id');

    let query = 'SELECT * FROM products';
    let params: any[] = [];

    if (categoryId) {
      query += ' WHERE category_id = ?';
      params.push(categoryId);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await connection.execute(query, params);
    connection.release();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: Request) {
  const connection = await pool.getConnection();
  console.log('Database connection established for POST /api/products');
  
  try {
    const body = await request.json();
    const { name, description, price, stock, category_id, image_url } = body;
    console.log('Received product data:', { name, description, price, stock, category_id, image_url });

    // Validaciones
    if (!name || name.trim() === '') {
      console.log('Validation failed: Name is required');
      connection.release();
      return NextResponse.json(
        { error: 'El nombre del producto es requerido' },
        { status: 400 }
      );
    }

    if (!price || isNaN(price) || price <= 0) {
      console.log('Validation failed: Invalid price');
      connection.release();
      return NextResponse.json(
        { error: 'El precio debe ser un número mayor a 0' },
        { status: 400 }
      );
    }

    if (!category_id) {
      console.log('Validation failed: Category is required');
      connection.release();
      return NextResponse.json(
        { error: 'La categoría es requerida' },
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
      console.log('Category not found');
      connection.release();
      return NextResponse.json(
        { error: 'La categoría seleccionada no existe' },
        { status: 400 }
      );
    }

    // Insertar el producto
    console.log('Inserting product...');
    const [result] = await connection.execute(
      'INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [
        name.trim(),
        description ? description.trim() : null,
        price,
        stock || 0,
        category_id,
        image_url || null
      ]
    );
    console.log('Product inserted successfully:', result);

    // Obtener el producto creado
    const [product] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [(result as any).insertId]
    );
    console.log('Retrieved new product:', product[0]);

    connection.release();
    return NextResponse.json((product as any[])[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    connection.release();
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 