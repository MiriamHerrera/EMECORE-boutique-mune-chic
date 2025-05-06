import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const meta: MetaFunction = () => {
  return [
    { title: "Muñe Chic - Tu Boutique de Moda" },
    { description: "Encuentra los mejores artículos de moda en Muñe Chic. Ropa, zapatos, accesorios y más." }
  ];
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Index() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [brandsRef, brandsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative h-[85vh] min-h-[600px] flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Muñe Chic Boutique"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>
        
        <div className="container-main relative z-10 text-white">
          <motion.h1 
            variants={fadeIn}
            className="mb-6 text-balance"
          >
            Tu Estilo, <span className="text-primary">Tu Elegancia</span>
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl mb-8 max-w-2xl text-balance"
          >
            Descubre nuestra exclusiva colección de moda y accesorios para expresar tu estilo único.
          </motion.p>
          <motion.div 
            variants={staggerChildren}
            className="flex flex-wrap gap-4"
          >
            <motion.div variants={fadeIn}>
              <Link to="/productos" className="btn-primary hover:scale-105 transform transition-transform">
                Ver Productos
              </Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <a 
                href="https://wa.me/tunumero"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary hover:scale-105 transform transition-transform"
              >
                Contactar
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white text-4xl cursor-pointer"
          >
            ↓
          </motion.div>
        </div>
      </motion.section>

      {/* Categorías Destacadas */}
      <motion.section 
        ref={categoriesRef}
        initial="hidden"
        animate={categoriesInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="container-main py-20"
      >
        <motion.h2 variants={fadeIn} className="text-center mb-12">
          Categorías Destacadas
        </motion.h2>
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
      </motion.section>

      {/* Marcas */}
      <motion.section 
        ref={brandsRef}
        initial="hidden"
        animate={brandsInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="bg-gray-100 py-20"
      >
        <div className="container-main">
          <motion.h2 variants={fadeIn} className="text-center mb-12">
            Marcas Destacadas
          </motion.h2>
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
          >
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <img 
                  src={`/images/marca${index}.png`} 
                  alt={`Marca ${index}`} 
                  className="h-12 object-contain mx-auto" 
                  loading="lazy" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Sobre Nosotros */}
      <motion.section 
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="container-main py-20"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeIn}>
            <h2 className="mb-6">Sobre Muñe Chic</h2>
            <p className="text-lg mb-6 text-gray-600">
              En Muñe Chic, nos dedicamos a ofrecerte lo mejor en moda y estilo. 
              Nuestra boutique cuenta con una cuidadosa selección de prendas y 
              accesorios de las mejores marcas.
            </p>
            <Link 
              to="/nosotros" 
              className="btn-secondary inline-block hover:scale-105 transform transition-transform"
            >
              Conoce más
            </Link>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-lg transform -rotate-3"></div>
            <img
              src="/images/about.jpg"
              alt="Nuestra Boutique"
              className="rounded-lg shadow-xl relative z-10"
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-primary py-20"
      >
        <div className="container-main text-center">
          <h2 className="text-dark mb-6">¿Lista para renovar tu estilo?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
            Visítanos o contáctanos por WhatsApp para descubrir nuestra colección completa.
          </p>
          <motion.a
            href="https://wa.me/tunumero"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactar ahora
          </motion.a>
        </div>
      </motion.section>
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
    <motion.div variants={fadeIn}>
      <Link
        to={href}
        className="group relative overflow-hidden rounded-lg aspect-square block"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full h-full"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute inset-0 flex items-end p-6">
            <div>
              <h3 className="text-white text-2xl font-semibold transform group-hover:translate-x-2 transition-transform">
                {title}
              </h3>
              <p className="text-primary/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Explorar colección →
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
} 