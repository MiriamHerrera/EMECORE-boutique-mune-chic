import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, 
        c.name as category_name,
        s.name as subcategory_name,
        (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
    `;

    const params: any[] = [];

    if (categoryId) {
      query += ' WHERE p.category_id = ?';
      params.push(categoryId);
    }

    if (subcategoryId) {
      query += categoryId ? ' AND p.subcategory_id = ?' : ' WHERE p.subcategory_id = ?';
      params.push(subcategoryId);
    }

    // Obtener el total de productos
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM (${query}) as t`,
      params
    );
    const total = (countResult as any[])[0].total;

    // Obtener los productos paginados
    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
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
    const {
      name,
      description,
      price,
      category_id,
      subcategory_id,
      attributes,
      images
    } = body;

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

    // Verificar que la subcategoría existe si se proporciona
    if (subcategory_id) {
      const [subcategory] = await pool.execute(
        'SELECT id FROM subcategories WHERE id = ? AND category_id = ?',
        [subcategory_id, category_id]
      );

      if (!(subcategory as any[]).length) {
        return NextResponse.json(
          { error: 'La subcategoría no existe o no pertenece a la categoría seleccionada' },
          { status: 404 }
        );
      }
    }

    // Crear el producto
    const [result] = await pool.execute(
      `INSERT INTO products (
        name, description, price, category_id, subcategory_id
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        name.trim(),
        description ? description.trim() : null,
        price,
        category_id,
        subcategory_id || null
      ]
    );

    const productId = (result as any).insertId;

    // Guardar los atributos del producto
    if (Array.isArray(attributes) && attributes.length > 0) {
      const attributeInserts = attributes.map((attr: any) => [
        productId,
        attr.attribute_id,
        attr.value
      ]);

      await pool.query(
        'INSERT INTO product_attribute_values (product_id, attribute_id, value) VALUES ?',
        [attributeInserts]
      );
    }

    // Guardar las imágenes del producto
    if (Array.isArray(images) && images.length > 0) {
      const imageInserts = images.map((img: any, index: number) => [
        productId,
        img.url,
        index === 0 // La primera imagen es la principal
      ]);

      await pool.query(
        'INSERT INTO product_images (product_id, url, is_main) VALUES ?',
        [imageInserts]
      );
    }

    // Obtener el producto creado con sus atributos e imágenes
    const [rows] = await pool.execute(
      `SELECT p.*, 
        c.name as category_name,
        s.name as subcategory_name,
        (SELECT url FROM product_images WHERE product_id = p.id AND is_main = true LIMIT 1) as main_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.id
      WHERE p.id = ?`,
      [productId]
    );

    const product = rows[0];

    // Obtener los atributos del producto
    const [productAttributes] = await pool.execute(
      `SELECT pav.*, a.name as attribute_name, a.type as attribute_type
      FROM product_attribute_values pav
      INNER JOIN attributes a ON pav.attribute_id = a.id
      WHERE pav.product_id = ?`,
      [productId]
    );

    product.attributes = productAttributes;

    // Obtener las imágenes del producto
    const [productImages] = await pool.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC',
      [productId]
    );

    product.images = productImages;

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 