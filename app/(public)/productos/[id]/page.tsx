'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  category_id: number;
  subcategory_id: number | null;
  category_name?: string;
  subcategory_name?: string;
  image_url?: string;
  images?: string[];
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/productos/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar el producto');
        }
        
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar el producto');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="text-center py-8 md:py-16">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
              {error || 'Producto no encontrado'}
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6">
              Lo sentimos, no pudimos encontrar el producto que buscas.
            </p>
            <button
              onClick={() => router.push('/productos')}
              className="inline-block bg-pink-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-pink-700 transition-colors text-sm md:text-base"
            >
              Volver a productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : product.image_url 
      ? [product.image_url] 
      : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
            {/* Imagen o Carrusel del producto */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {images.length > 0 ? (
                <div className="relative w-full h-full">
                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                      {images.map((image, index) => (
                        <div key={index} className="flex-[0_0_100%] relative aspect-square">
                          <Image
                            src={image}
                            alt={`${product.name} - Imagen ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index === 0}
                            quality={85}
                            unoptimized={false}
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              inset: 0,
                              color: 'transparent'
                            }}
                            onError={(e) => {
                              console.error('Error loading image:', e);
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.png';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Controles del carrusel */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={scrollPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={scrollNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      {/* Indicadores de posición */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === selectedIndex ? 'bg-pink-600' : 'bg-white/50'
                            }`}
                            aria-label={`Ir a imagen ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-gray-400 text-sm md:text-base">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="flex flex-col">
              <div className="mb-3 md:mb-4">
                <span className="text-xs md:text-sm font-medium text-pink-600 bg-pink-50 px-2 md:px-3 py-1 rounded-full">
                  {product.category_name}
                </span>
                {product.subcategory_name && (
                  <span className="ml-2 text-xs md:text-sm font-medium text-gray-600 bg-gray-50 px-2 md:px-3 py-1 rounded-full">
                    {product.subcategory_name}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                {product.name}
              </h1>

              <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
              </p>

              {product.description && (
                <div className="mb-4 md:mb-6">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                    Descripción
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-auto pt-4 md:pt-6">
                <a
                  href={`https://wa.me/573108888888?text=Hola, me gustaría obtener más información sobre el producto: ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 py-3 md:px-6 md:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 