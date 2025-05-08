import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface TokenPayload {
  id: number;
  role: string;
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function hashPassword(password: string) {
  const bcrypt = require('bcryptjs');
  return bcrypt.hash(password, 10);
}

export async function getCurrentUser(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return null;

    const token = cookieHeader.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    return decoded;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function requireAdmin(request: Request) {
  const user = await getCurrentUser(request);
  
  if (!user || user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }

  return user;
} 