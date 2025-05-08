import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId');
    const offset = (page - 1) * limit;

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
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM (${query}) as t`,
      params
    );
    const total = (countResult as any[])[0].total;

    // Obtener los productos paginados
    query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [products] = await pool.execute(query, params);

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
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: Request) {
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

    // Crear el producto
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)',
      [name.trim(), description ? description.trim() : null, price, category_id]
    );

    const productId = (result as any).insertId;

    // Obtener el producto creado
    const [rows] = await pool.execute(
      `SELECT p.*, 
        c.name as category_name,
        (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [productId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 