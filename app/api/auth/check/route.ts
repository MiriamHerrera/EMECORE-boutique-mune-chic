import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Obtener el token de las cookies
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const token = cookieHeader.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verificar el token
    const decoded = await verifyToken(token);
    if (!decoded || !decoded.id || decoded.role !== 'admin') {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Obtener información del usuario
    const [rows] = await pool.execute(
      'SELECT id, email, first_name, last_name, role FROM users WHERE id = ?',
      [decoded.id]
    );

    const user = (rows as any[])[0];
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
} 