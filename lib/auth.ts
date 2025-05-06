import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface TokenPayload {
  id: number;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  const decoded = await verifyToken(token);
  if (!decoded) return null;

  const [rows] = await pool.execute(
    'SELECT id, email, first_name, last_name, role FROM users WHERE id = ?',
    [decoded.userId]
  );

  return rows[0];
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }

  return user;
} 