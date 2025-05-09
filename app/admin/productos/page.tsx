'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload } from 'react-icons/fi';
import PlaceholderImage from '@/components/PlaceholderImage';

interface Product {
  id: string;
  name: string;
  price: number | string;
  category: string;
  stock: number;
  image: string;
  description?: string;
  category_id?: number;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  category_id: string;
  stock: number;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  price: 0,
  category_id: '',
  stock: 0,
};

export default function ProductsAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Limpiar la URL del objeto cuando el componente se desmonte
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
    }
  };

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('La imagen no debe superar los 10MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('El archivo debe ser una imagen');
        return;
      }

      setSelectedImage(file);
      // Crear URL para preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('La imagen no debe superar los 10MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('El archivo debe ser una imagen');
        return;
      }

      setSelectedImage(file);
      // Crear URL para preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleEdit = async (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      category_id: product.category_id?.toString() || '',
      stock: product.stock
    });
    setPreviewUrl(product.image || '');
    setEditingProductId(product.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch(`/api/productos/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el producto');
      }

      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error instanceof Error ? error.message : 'Error al eliminar el producto');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('stock', formData.stock.toString());
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      console.log('Sending form data:', {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        stock: formData.stock,
        hasImage: !!selectedImage
      });

      const url = editingProductId 
        ? `/api/productos/${editingProductId}`
        : '/api/productos';

      console.log('Sending request to:', url);
      const response = await fetch(url, {
        method: editingProductId ? 'PUT' : 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.error || `Error al ${editingProductId ? 'actualizar' : 'crear'} el producto`);
      }

      const newProduct = await response.json();
      console.log('Server response:', newProduct);

      if (editingProductId) {
        setProducts(prev => prev.map(p => p.id === editingProductId ? newProduct : p));
      } else {
        setProducts(prev => [newProduct, ...prev]);
      }

      setFormData(initialFormData);
      setSelectedImage(null);
      setPreviewUrl('');
      setEditingProductId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error instanceof Error ? error.message : 'Error al guardar el producto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
          <p className="text-gray-600 mt-1">Gestiona el catálogo de productos</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300"
        >
          <FiPlus className="text-lg" />
          Nuevo Producto
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Lista de Productos */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
          <div className="col-span-1">Imagen</div>
          <div className="col-span-3">Nombre</div>
          <div className="col-span-2">Categoría</div>
          <div className="col-span-2">Precio</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-2">Acciones</div>
        </div>
        
        {Array.isArray(products) && products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12 gap-4 p-4 items-center border-b hover:bg-gray-50 transition-colors"
          >
            <div className="col-span-1">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              ) : (
                <PlaceholderImage
                  width={48}
                  height={48}
                  text=""
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="col-span-3">
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">ID: {product.id}</p>
            </div>
            <div className="col-span-2 text-gray-600">
              {categories.find(c => c.id === product.category_id)?.name || 'Sin categoría'}
            </div>
            <div className="col-span-2 text-gray-600">
              ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
            </div>
            <div className="col-span-2">
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.stock > 10
                  ? 'bg-green-100 text-green-800'
                  : product.stock > 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock} unidades
              </span>
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Editar"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}

        {(!Array.isArray(products) || products.length === 0) && (
          <div className="p-8 text-center text-gray-500">
            No hay productos registrados
          </div>
        )}
      </div>

      {/* Modal de Nuevo Producto */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProductId ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData(initialFormData);
                    setSelectedImage(null);
                    setPreviewUrl('');
                    setEditingProductId(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-xl text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Producto
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Ej: Vestido Floral"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name} - {category.gender} - {category.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows={4}
                    placeholder="Describe el producto..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen del Producto
                  </label>
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 ${!selectedImage ? 'border-dashed' : 'border-solid'} rounded-lg`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <div className="relative w-40 h-40 mx-auto">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedImage(null);
                              setPreviewUrl('');
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-pink-500 hover:text-pink-600"
                            >
                              <span>Subir archivo</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                              />
                            </label>
                            <p className="pl-1">o arrastra y suelta</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF hasta 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Guardando...' : 'Guardar Producto'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 