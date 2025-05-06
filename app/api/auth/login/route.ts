import { NextResponse } from 'next/server';
import { comparePasswords, generateToken } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: Request) {
  console.log('Login endpoint called');
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario por email
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = (rows as any[])[0];
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar si el usuario es administrador
    if (user.role !== 'admin') {
      console.log('User is not admin');
      return NextResponse.json(
        { error: 'Acceso no autorizado' },
        { status: 403 }
      );
    }

    // Verificar contraseña
    const isValidPassword = await comparePasswords(password, user.password);
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token
    const token = generateToken({
      id: user.id,
      role: user.role
    });
    console.log('Token generated');

    // Crear la respuesta
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });

    // Establecer cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 horas
    });
    console.log('Cookie set');

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
} 