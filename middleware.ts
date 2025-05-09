import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/', '/productos', '/marcas', '/nosotros', '/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // No aplicar middleware a rutas de API o archivos estáticos
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Verificar si la ruta es de administración
  if (pathname.startsWith('/admin')) {
    // Permitir acceso a la página de login
    if (pathname === '/admin/login') {
      // Si ya está autenticado, redirigir al dashboard
      const token = request.cookies.get('token');
      if (token) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Para otras rutas de admin, verificar autenticación
    const token = request.cookies.get('token');
    if (!token) {
      // Guardar la URL original para redirigir después del login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Permitir acceso a archivos en la carpeta uploads
  if (pathname.startsWith('/uploads/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configurar las rutas que deben ser procesadas por el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/uploads/:path*',
  ],
}; 