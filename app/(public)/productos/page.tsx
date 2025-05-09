'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../../../components/ProductCard';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category_id: number;
  image_url?: string;
  category_name?: string;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
  gender: 'hombre' | 'mujer' | 'unisex';
  type: 'ropa' | 'calzado' | 'accesorios';
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/productos');
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      console.log('Products data:', data);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const data = await response.json();
      console.log('Categories loaded:', data);
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error al cargar las categorías');
    }
  };

  const filteredProducts = Array.isArray(products) ? products.filter(product => 
    (!selectedCategory || product.category_id.toString() === selectedCategory) &&
    (!searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())))
  ) : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Colección</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            Descubre nuestra selección de productos exclusivos, diseñados con amor y dedicación para ti.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} - {category.gender} - {category.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiList size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Lista de Productos */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description || ''}
                  price={product.price}
                  image={product.image_url || ''}
                  category={product.category_name || ''}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600 text-lg">
              {searchTerm || selectedCategory
                ? 'No se encontraron productos que coincidan con los filtros'
                : 'No hay productos disponibles'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 