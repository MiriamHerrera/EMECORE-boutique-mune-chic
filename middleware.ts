import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // No aplicar middleware a rutas de API o archivos estáticos
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Verificar si la ruta es de administración
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // No verificar autenticación en la página de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('token');

    // Si no hay token, redirigir al login
    if (!token) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }

    try {
      // Permitir que la página maneje la verificación del token
      return NextResponse.next();
    } catch (error) {
      console.error('Error in middleware:', error);
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 