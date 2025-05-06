import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProducts } from "~/services/products.server";
import type { Product } from "~/types/product";

export async function loader() {
  const products = await getProducts();
  return json({ products });
}

export default function Products() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="py-12">
      <h1 className="text-center mb-12">Nuestros Productos</h1>

      {/* Filtros */}
      <div className="mb-8">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="form-select">
              <option value="">Todas las categorías</option>
              <option value="ropa">Ropa</option>
              <option value="zapatos">Zapatos</option>
              <option value="accesorios">Accesorios</option>
            </select>

            <select className="form-select">
              <option value="">Ordenar por</option>
              <option value="newest">Más recientes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>

            <input
              type="search"
              placeholder="Buscar productos..."
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
        <img
          src={product.main_image || '/images/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category_name}</p>
        <p className="mt-2 text-lg font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
} 