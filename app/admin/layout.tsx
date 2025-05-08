import { ReactNode } from 'react';
import AdminSidebar from '@/components/AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
} 