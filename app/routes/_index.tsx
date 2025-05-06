import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Muñe Chic - Tu Boutique de Moda" },
    { description: "Encuentra los mejores artículos de moda en Muñe Chic. Ropa, zapatos, accesorios y más." }
  ];
};

export default function Index() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Muñe Chic Boutique"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container-main relative z-10 text-white">
          <h1 className="mb-6">
            Tu Estilo, Tu Elegancia
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Descubre nuestra exclusiva colección de moda y accesorios para expresar tu estilo único.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/productos" className="btn-primary">
              Ver Productos
            </Link>
            <a 
              href="https://wa.me/tunumero"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="container-main">
        <h2 className="text-center mb-12">Categorías Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CategoryCard
            title="Ropa"
            image="/images/ropa.jpg"
            href="/productos?categoria=ropa"
          />
          <CategoryCard
            title="Zapatos"
            image="/images/zapatos.jpg"
            href="/productos?categoria=zapatos"
          />
          <CategoryCard
            title="Accesorios"
            image="/images/accesorios.jpg"
            href="/productos?categoria=accesorios"
          />
        </div>
      </section>

      {/* Marcas */}
      <section className="bg-gray-100 py-20">
        <div className="container-main">
          <h2 className="text-center mb-12">Marcas Destacadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Aquí irían los logos de las marcas */}
            <img src="/images/marca1.png" alt="Marca 1" className="h-12 object-contain" loading="lazy" />
            <img src="/images/marca2.png" alt="Marca 2" className="h-12 object-contain" loading="lazy" />
            <img src="/images/marca3.png" alt="Marca 3" className="h-12 object-contain" loading="lazy" />
            <img src="/images/marca4.png" alt="Marca 4" className="h-12 object-contain" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Sobre Muñe Chic</h2>
            <p className="text-lg mb-6">
              En Muñe Chic, nos dedicamos a ofrecerte lo mejor en moda y estilo. 
              Nuestra boutique cuenta con una cuidadosa selección de prendas y 
              accesorios de las mejores marcas.
            </p>
            <Link to="/nosotros" className="btn-secondary inline-block">
              Conoce más
            </Link>
          </div>
          <div>
            <img
              src="/images/about.jpg"
              alt="Nuestra Boutique"
              className="rounded-lg shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container-main text-center">
          <h2 className="text-dark mb-6">¿Listo para renovar tu estilo?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Visítanos o contáctanos por WhatsApp para descubrir nuestra colección completa.
          </p>
          <a
            href="https://wa.me/tunumero"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Contactar ahora
          </a>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ 
  title, 
  image, 
  href 
}: { 
  title: string; 
  image: string; 
  href: string; 
}) {
  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-lg aspect-square"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
        <h3 className="text-white text-2xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
} 