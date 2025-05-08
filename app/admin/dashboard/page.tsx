'use client';

import { useEffect, useState } from 'react';
import { FaBox, FaTags, FaUsers, FaShoppingCart } from 'react-icons/fa';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0
  });

  useEffect(() => {
    // Aquí iría la llamada a la API para obtener las estadísticas
    // Por ahora usamos datos de ejemplo
    setStats({
      totalProducts: 150,
      totalCategories: 12,
      totalOrders: 45,
      totalUsers: 89
    });
  }, []);

  const statCards = [
    {
      title: 'Productos',
      value: stats.totalProducts,
      icon: FaBox,
      color: 'bg-blue-500'
    },
    {
      title: 'Categorías',
      value: stats.totalCategories,
      icon: FaTags,
      color: 'bg-green-500'
    },
    {
      title: 'Pedidos',
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: 'bg-yellow-500'
    },
    {
      title: 'Usuarios',
      value: stats.totalUsers,
      icon: FaUsers,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Aquí irían más secciones del dashboard */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Últimos Pedidos
          </h2>
          {/* Aquí iría la lista de últimos pedidos */}
          <p className="text-gray-600">No hay pedidos recientes</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Productos Populares
          </h2>
          {/* Aquí iría la lista de productos populares */}
          <p className="text-gray-600">No hay datos disponibles</p>
        </div>
      </div>
    </div>
  );
} 