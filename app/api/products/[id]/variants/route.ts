import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/products/[id]/variants
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [variants] = await pool.execute(
      `SELECT v.*, 
        (SELECT url FROM product_images WHERE product_id = v.id AND is_main = true LIMIT 1) as main_image
      FROM product_variants v
      WHERE v.product_id = ?
      ORDER BY v.created_at DESC`,
      [params.id]
    );

    // Para cada variante, obtener sus atributos
    const variantsWithAttributes = await Promise.all(
      (variants as any[]).map(async (variant) => {
        const [attributes] = await pool.execute(
          `SELECT vav.*, a.name as attribute_name, a.type as attribute_type
          FROM variant_attribute_values vav
          INNER JOIN attributes a ON vav.attribute_id = a.id
          WHERE vav.variant_id = ?`,
          [variant.id]
        );
        return {
          ...variant,
          attributes
        };
      })
    );

    return NextResponse.json(variantsWithAttributes);
  } catch (error) {
    console.error('Error fetching product variants:', error);
    return NextResponse.json(
      { error: 'Error al obtener las variantes del producto' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/variants
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { sku, price, stock, attributes, images } = body;

    if (!sku || sku.trim() === '') {
      return NextResponse.json(
        { error: 'El SKU de la variante es requerido' },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: 'El precio de la variante es requerido y debe ser mayor a 0' },
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

    // Verificar que el SKU no está duplicado
    const [existingSku] = await pool.execute(
      'SELECT id FROM product_variants WHERE sku = ?',
      [sku.trim()]
    );

    if ((existingSku as any[]).length > 0) {
      return NextResponse.json(
        { error: 'Ya existe una variante con este SKU' },
        { status: 400 }
      );
    }

    // Crear la variante
    const [result] = await pool.execute(
      `INSERT INTO product_variants (
        product_id, sku, price, stock
      ) VALUES (?, ?, ?, ?)`,
      [
        params.id,
        sku.trim(),
        price,
        stock || 0
      ]
    );

    const variantId = (result as any).insertId;

    // Guardar los atributos de la variante
    if (Array.isArray(attributes) && attributes.length > 0) {
      const attributeInserts = attributes.map((attr: any) => [
        variantId,
        attr.attribute_id,
        attr.value
      ]);

      await pool.query(
        'INSERT INTO variant_attribute_values (variant_id, attribute_id, value) VALUES ?',
        [attributeInserts]
      );
    }

    // Guardar las imágenes de la variante
    if (Array.isArray(images) && images.length > 0) {
      const imageInserts = images.map((img: any, index: number) => [
        variantId,
        img.url,
        index === 0 // La primera imagen es la principal
      ]);

      await pool.query(
        'INSERT INTO product_images (product_id, url, is_main) VALUES ?',
        [imageInserts]
      );
    }

    // Obtener la variante creada con sus atributos e imágenes
    const [rows] = await pool.execute(
      `SELECT v.*, 
        (SELECT url FROM product_images WHERE product_id = v.id AND is_main = true LIMIT 1) as main_image
      FROM product_variants v
      WHERE v.id = ?`,
      [variantId]
    );

    const variant = rows[0];

    // Obtener los atributos de la variante
    const [variantAttributes] = await pool.execute(
      `SELECT vav.*, a.name as attribute_name, a.type as attribute_type
      FROM variant_attribute_values vav
      INNER JOIN attributes a ON vav.attribute_id = a.id
      WHERE vav.variant_id = ?`,
      [variantId]
    );

    variant.attributes = variantAttributes;

    // Obtener las imágenes de la variante
    const [variantImages] = await pool.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC',
      [variantId]
    );

    variant.images = variantImages;

    return NextResponse.json(variant);
  } catch (error) {
    console.error('Error creating product variant:', error);
    return NextResponse.json(
      { error: 'Error al crear la variante del producto' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]/variants/[variantId]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; variantId: string } }
) {
  try {
    const body = await request.json();
    const { price, stock } = body;

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

    // Actualizar la variante
    const updates: string[] = [];
    const values: any[] = [];

    if (price !== undefined) {
      if (price <= 0) {
        return NextResponse.json(
          { error: 'El precio debe ser mayor a 0' },
          { status: 400 }
        );
      }
      updates.push('price = ?');
      values.push(price);
    }

    if (stock !== undefined) {
      if (stock < 0) {
        return NextResponse.json(
          { error: 'El stock no puede ser negativo' },
          { status: 400 }
        );
      }
      updates.push('stock = ?');
      values.push(stock);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron campos para actualizar' },
        { status: 400 }
      );
    }

    values.push(params.variantId);

    await pool.execute(
      `UPDATE product_variants SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const [rows] = await pool.execute(
      `SELECT v.*, 
        (SELECT url FROM product_images WHERE product_id = v.id AND is_main = true LIMIT 1) as main_image
      FROM product_variants v
      WHERE v.id = ?`,
      [params.variantId]
    );

    const updatedVariant = rows[0];

    // Obtener los atributos de la variante
    const [variantAttributes] = await pool.execute(
      `SELECT vav.*, a.name as attribute_name, a.type as attribute_type
      FROM variant_attribute_values vav
      INNER JOIN attributes a ON vav.attribute_id = a.id
      WHERE vav.variant_id = ?`,
      [params.variantId]
    );

    updatedVariant.attributes = variantAttributes;

    // Obtener las imágenes de la variante
    const [variantImages] = await pool.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC',
      [params.variantId]
    );

    updatedVariant.images = variantImages;

    return NextResponse.json(updatedVariant);
  } catch (error) {
    console.error('Error updating product variant:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la variante del producto' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/variants/[variantId]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; variantId: string } }
) {
  try {
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

    // Eliminar los atributos de la variante
    await pool.execute(
      'DELETE FROM variant_attribute_values WHERE variant_id = ?',
      [params.variantId]
    );

    // Eliminar las imágenes de la variante
    await pool.execute(
      'DELETE FROM product_images WHERE product_id = ?',
      [params.variantId]
    );

    // Eliminar la variante
    await pool.execute(
      'DELETE FROM product_variants WHERE id = ?',
      [params.variantId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product variant:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la variante del producto' },
      { status: 500 }
    );
  }
} 