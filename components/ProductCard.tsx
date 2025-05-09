import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number | string;
  image: string;
  category: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  category
}: ProductCardProps) {
  // Convert price to number and handle potential invalid values
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  const formattedPrice = !isNaN(numericPrice) ? numericPrice.toFixed(2) : '0.00';

  return (
    <Link href={`/productos/${id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-square relative bg-gray-50">
          {image && image !== '' ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority={false}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Sin imagen</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">
              {category}
            </span>
            <span className="text-lg font-bold text-gray-900">
              ${formattedPrice}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {description}
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">Ver detalles</span>
            <span className="text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 