import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/products/[id]/variants/[variantId]/attributes
export async function GET(
  request: Request,
  { params }: { params: { id: string; variantId: string } }
) {
  try {
    const [attributes] = await pool.execute(
      `SELECT vav.*, a.name as attribute_name, a.type as attribute_type
      FROM variant_attribute_values vav
      INNER JOIN attributes a ON vav.attribute_id = a.id
      WHERE vav.variant_id = ?`,
      [params.variantId]
    );

    return NextResponse.json(attributes);
  } catch (error) {
    console.error('Error fetching variant attributes:', error);
    return NextResponse.json(
      { error: 'Error al obtener los atributos de la variante' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/variants/[variantId]/attributes
export async function POST(
  request: Request,
  { params }: { params: { id: string; variantId: string } }
) {
  try {
    const body = await request.json();
    const { attribute_id, value } = body;

    if (!attribute_id) {
      return NextResponse.json(
        { error: 'El ID del atributo es requerido' },
        { status: 400 }
      );
    }

    if (!value || value.trim() === '') {
      return NextResponse.json(
        { error: 'El valor del atributo es requerido' },
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

    // Verificar que el atributo existe y pertenece a la categoría del producto
    const [attribute] = await pool.execute(
      `SELECT a.id, a.type
      FROM attributes a
      INNER JOIN category_attributes ca ON a.id = ca.attribute_id
      INNER JOIN products p ON ca.category_id = p.category_id
      WHERE a.id = ? AND p.id = ?`,
      [attribute_id, params.id]
    );

    if (!(attribute as any[]).length) {
      return NextResponse.json(
        { error: 'El atributo no existe o no pertenece a la categoría del producto' },
        { status: 404 }
      );
    }

    // Si el atributo es de tipo select, verificar que el valor es válido
    if ((attribute as any[])[0].type === 'select') {
      const [validValue] = await pool.execute(
        'SELECT id FROM attribute_values WHERE attribute_id = ? AND value = ?',
        [attribute_id, value.trim()]
      );

      if (!(validValue as any[]).length) {
        return NextResponse.json(
          { error: 'El valor no es válido para este atributo' },
          { status: 400 }
        );
      }
    }

    // Verificar que no existe ya un valor para este atributo en la variante
    const [existing] = await pool.execute(
      'SELECT id FROM variant_attribute_values WHERE variant_id = ? AND attribute_id = ?',
      [params.variantId, attribute_id]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { error: 'Ya existe un valor para este atributo en la variante' },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO variant_attribute_values (variant_id, attribute_id, value) VALUES (?, ?, ?)',
      [params.variantId, attribute_id, value.trim()]
    );

    const insertId = (result as any).insertId;

    const [rows] = await pool.execute(
      `SELECT vav.*, a.name as attribute_name, a.type as attribute_type
      FROM variant_attribute_values vav
      INNER JOIN attributes a ON vav.attribute_id = a.id
      WHERE vav.id = ?`,
      [insertId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating variant attribute:', error);
    return NextResponse.json(
      { error: 'Error al crear el atributo de la variante' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]/variants/[variantId]/attributes/[attributeId]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; variantId: string; attributeId: string } }
) {
  try {
    const body = await request.json();
    const { value } = body;

    if (!value || value.trim() === '') {
      return NextResponse.json(
        { error: 'El valor del atributo es requerido' },
        { status: 400 }
      );
    }

    // Verificar que el valor del atributo existe y pertenece a la variante
    const [attributeValue] = await pool.execute(
      `SELECT vav.id, a.type
      FROM variant_attribute_values vav
      INNER JOIN attributes a ON vav.attribute_id = a.id
      WHERE vav.id = ? AND vav.variant_id = ?`,
      [params.attributeId, params.variantId]
    );

    if (!(attributeValue as any[]).length) {
      return NextResponse.json(
        { error: 'El valor del atributo no existe o no pertenece a la variante' },
        { status: 404 }
      );
    }

    // Si el atributo es de tipo select, verificar que el nuevo valor es válido
    if ((attributeValue as any[])[0].type === 'select') {
      const [validValue] = await pool.execute(
        'SELECT id FROM attribute_values WHERE attribute_id = ? AND value = ?',
        [params.attributeId, value.trim()]
      );

      if (!(validValue as any[]).length) {
        return NextResponse.json(
          { error: 'El valor no es válido para este atributo' },
          { status: 400 }
        );
      }
    }

    await pool.execute(
      'UPDATE variant_attribute_values SET value = ? WHERE id = ?',
      [value.trim(), params.attributeId]
    );

    const [rows] = await pool.execute(
      `SELECT vav.*, a.name as attribute_name, a.type as attribute_type
      FROM variant_attribute_values vav
      INNER JOIN attributes a ON vav.attribute_id = a.id
      WHERE vav.id = ?`,
      [params.attributeId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error updating variant attribute:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el atributo de la variante' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/variants/[variantId]/attributes/[attributeId]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; variantId: string; attributeId: string } }
) {
  try {
    // Verificar que el valor del atributo existe y pertenece a la variante
    const [attributeValue] = await pool.execute(
      'SELECT id FROM variant_attribute_values WHERE id = ? AND variant_id = ?',
      [params.attributeId, params.variantId]
    );

    if (!(attributeValue as any[]).length) {
      return NextResponse.json(
        { error: 'El valor del atributo no existe o no pertenece a la variante' },
        { status: 404 }
      );
    }

    await pool.execute(
      'DELETE FROM variant_attribute_values WHERE id = ?',
      [params.attributeId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting variant attribute:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el atributo de la variante' },
      { status: 500 }
    );
  }
} 