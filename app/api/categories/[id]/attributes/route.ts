import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/categories/[id]/attributes
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [attributes] = await pool.execute(
      `SELECT a.*, ca.is_required, ca.display_order
      FROM attributes a
      INNER JOIN category_attributes ca ON a.id = ca.attribute_id
      WHERE ca.category_id = ?
      ORDER BY ca.display_order ASC`,
      [params.id]
    );

    // Para cada atributo, obtener sus valores posibles
    const attributesWithValues = await Promise.all(
      (attributes as any[]).map(async (attr) => {
        const [values] = await pool.execute(
          'SELECT * FROM attribute_values WHERE attribute_id = ? ORDER BY value ASC',
          [attr.id]
        );
        return {
          ...attr,
          values
        };
      })
    );

    return NextResponse.json(attributesWithValues);
  } catch (error) {
    console.error('Error fetching category attributes:', error);
    return NextResponse.json(
      { error: 'Error al obtener los atributos de la categoría' },
      { status: 500 }
    );
  }
}

// POST /api/categories/[id]/attributes
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, type, is_required, display_order, values } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre del atributo es requerido' },
        { status: 400 }
      );
    }

    if (!type || !['text', 'number', 'select', 'color', 'size'].includes(type)) {
      return NextResponse.json(
        { error: 'El tipo de atributo es inválido' },
        { status: 400 }
      );
    }

    // Verificar que la categoría existe
    const [category] = await pool.execute(
      'SELECT id FROM categories WHERE id = ?',
      [params.id]
    );

    if (!(category as any[]).length) {
      return NextResponse.json(
        { error: 'La categoría no existe' },
        { status: 404 }
      );
    }

    // Crear el atributo
    const [attrResult] = await pool.execute(
      'INSERT INTO attributes (name, type) VALUES (?, ?)',
      [name.trim(), type]
    );

    const attributeId = (attrResult as any).insertId;

    // Relacionar el atributo con la categoría
    await pool.execute(
      'INSERT INTO category_attributes (category_id, attribute_id, is_required, display_order) VALUES (?, ?, ?, ?)',
      [params.id, attributeId, is_required || false, display_order || 0]
    );

    // Si el atributo es de tipo select, crear los valores posibles
    if (type === 'select' && Array.isArray(values) && values.length > 0) {
      const valueInserts = values.map((value: string) => [
        attributeId,
        value.trim()
      ]);

      await pool.query(
        'INSERT INTO attribute_values (attribute_id, value) VALUES ?',
        [valueInserts]
      );
    }

    // Obtener el atributo creado con sus valores
    const [rows] = await pool.execute(
      `SELECT a.*, ca.is_required, ca.display_order
      FROM attributes a
      INNER JOIN category_attributes ca ON a.id = ca.attribute_id
      WHERE a.id = ?`,
      [attributeId]
    );

    const attribute = rows[0];

    if (type === 'select') {
      const [values] = await pool.execute(
        'SELECT * FROM attribute_values WHERE attribute_id = ? ORDER BY value ASC',
        [attributeId]
      );
      attribute.values = values;
    }

    return NextResponse.json(attribute);
  } catch (error) {
    console.error('Error creating category attribute:', error);
    return NextResponse.json(
      { error: 'Error al crear el atributo de la categoría' },
      { status: 500 }
    );
  }
} 