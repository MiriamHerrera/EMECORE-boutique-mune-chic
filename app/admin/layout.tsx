'use client';

import { ReactNode } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Verificar autenticación al cargar el layout
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok && !isLoginPage) {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        if (!isLoginPage) {
          router.push('/admin/login');
        }
      }
    };
    checkAuth();
  }, [router, isLoginPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoginPage && <AdminSidebar />}
      <main className={!isLoginPage ? "md:ml-64 p-8" : ""}>
        {children}
      </main>
    </div>
  );
} 