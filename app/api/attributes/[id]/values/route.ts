import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET /api/attributes/[id]/values
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [values] = await pool.execute(
      'SELECT * FROM attribute_values WHERE attribute_id = ? ORDER BY value ASC',
      [params.id]
    );

    return NextResponse.json(values);
  } catch (error) {
    console.error('Error fetching attribute values:', error);
    return NextResponse.json(
      { error: 'Error al obtener los valores del atributo' },
      { status: 500 }
    );
  }
}

// POST /api/attributes/[id]/values
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { value } = body;

    if (!value || value.trim() === '') {
      return NextResponse.json(
        { error: 'El valor es requerido' },
        { status: 400 }
      );
    }

    // Verificar que el atributo existe y es de tipo select
    const [attribute] = await pool.execute(
      'SELECT id, type FROM attributes WHERE id = ?',
      [params.id]
    );

    if (!(attribute as any[]).length) {
      return NextResponse.json(
        { error: 'El atributo no existe' },
        { status: 404 }
      );
    }

    if ((attribute as any[])[0].type !== 'select') {
      return NextResponse.json(
        { error: 'Solo los atributos de tipo select pueden tener valores predefinidos' },
        { status: 400 }
      );
    }

    // Verificar que el valor no existe ya
    const [existing] = await pool.execute(
      'SELECT id FROM attribute_values WHERE attribute_id = ? AND value = ?',
      [params.id, value.trim()]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { error: 'Este valor ya existe para este atributo' },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO attribute_values (attribute_id, value) VALUES (?, ?)',
      [params.id, value.trim()]
    );

    const insertId = (result as any).insertId;

    const [rows] = await pool.execute(
      'SELECT * FROM attribute_values WHERE id = ?',
      [insertId]
    );

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating attribute value:', error);
    return NextResponse.json(
      { error: 'Error al crear el valor del atributo' },
      { status: 500 }
    );
  }
}

// DELETE /api/attributes/[id]/values/[valueId]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; valueId: string } }
) {
  try {
    // Verificar que el valor existe
    const [value] = await pool.execute(
      'SELECT id FROM attribute_values WHERE id = ? AND attribute_id = ?',
      [params.valueId, params.id]
    );

    if (!(value as any[]).length) {
      return NextResponse.json(
        { error: 'El valor no existe' },
        { status: 404 }
      );
    }

    await pool.execute(
      'DELETE FROM attribute_values WHERE id = ?',
      [params.valueId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting attribute value:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el valor del atributo' },
      { status: 500 }
    );
  }
} 