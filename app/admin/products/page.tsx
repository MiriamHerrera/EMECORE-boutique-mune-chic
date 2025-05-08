'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ImageUpload from '@/components/ImageUpload';

interface Image {
  url: string;
  file?: File;
  isMain?: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  category_name: string;
  main_image?: string;
  images?: Image[];
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategoryId('');
    setImages([]);
    setError('');
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setCategoryId(product.category_id.toString());
    setIsEditing(true);

    // Cargar imágenes existentes
    try {
      const response = await fetch(`/api/products/${product.id}/images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data.map((img: any) => ({
          url: img.url,
          isMain: img.is_main
        })));
      }
    } catch (error) {
      console.error('Error fetching product images:', error);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      } else {
        const data = await response.json();
        setError(data.error || 'Error al eliminar el producto');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError('');
    setIsLoading(true);

    try {
      const url = isEditing ? `/api/products/${editingProduct?.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      // Crear o actualizar el producto
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          category_id: parseInt(categoryId),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si hay imágenes nuevas, subirlas
        if (images.length > 0) {
          const formData = new FormData();
          let hasNewImages = false;

          images.forEach((image) => {
            if (image.file) {
              formData.append('images', image.file);
              hasNewImages = true;
            }
          });

          if (hasNewImages) {
            const mainImage = images.find(img => img.isMain);
            formData.append('isMain', String(!!mainImage));

            await fetch(`/api/products/${data.id}/images`, {
              method: 'POST',
              body: formData,
            });
          }
        }

        resetForm();
        fetchProducts();
      } else {
        setError(data.error || `Error al ${isEditing ? 'actualizar' : 'crear'} el producto`);
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <FaPlus /> Nuevo Producto
          </button>
        </div>

        {/* Búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Precio
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Categoría
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={isLoading}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Carga de imágenes */}
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Imágenes
            </label>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
          </div>

          <div className="flex items-center justify-end mt-6 gap-4">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-xl font-semibold mb-4">Productos Existentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                      {product.main_image ? (
                        <img
                          src={product.main_image}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                          No imagen
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                      {product.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                      {product.category_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No hay productos que coincidan con la búsqueda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 