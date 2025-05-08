'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Error al cargar los productos');
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(product => 
      (!selectedCategory || product.category_id.toString() === selectedCategory) &&
      (!searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="container-main py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-main py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-12">
      <motion.h1 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-4xl font-bold text-center mb-12"
      >
        Nuestros Productos
      </motion.h1>

      {/* Filtros */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          >
            <option value="">Todas las categorías</option>
            <option value="1">Ropa</option>
            <option value="2">Zapatos</option>
            <option value="3">Accesorios</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          >
            <option value="">Ordenar por</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name">Nombre</option>
          </select>

          <input
            type="search"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="group"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
              <img
                src={product.main_image || '/images/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category_name}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      )}
    </div>
  );
} 