import { NextResponse } from 'next/server';
import { comparePasswords, generateToken } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar conexión a la base de datos
    let connection;
    try {
      connection = await pool.getConnection();
    } catch (error) {
      console.error('Error connecting to database:', error);
      return NextResponse.json(
        { message: 'Error de conexión a la base de datos' },
        { status: 500 }
      );
    }

    try {
      // Buscar usuario en la base de datos
      const [rows] = await connection.execute(
        'SELECT id, email, password, role FROM users WHERE email = ?',
        [email]
      );

      const user = (rows as any[])[0];

      if (!user) {
        return NextResponse.json(
          { message: 'Credenciales inválidas' },
          { status: 401 }
        );
      }

      // Verificar contraseña
      const isValidPassword = await comparePasswords(password, user.password);

      if (!isValidPassword) {
        return NextResponse.json(
          { message: 'Credenciales inválidas' },
          { status: 401 }
        );
      }

      // Verificar si es admin
      if (user.role !== 'admin') {
        return NextResponse.json(
          { message: 'Acceso no autorizado' },
          { status: 403 }
        );
      }

      // Generar token
      const token = generateToken({ id: user.id, role: user.role });

      // Crear respuesta con cookie
      const response = NextResponse.json(
        { message: 'Login exitoso' },
        { status: 200 }
      );

      // Configurar cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 horas
      });

      return response;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 