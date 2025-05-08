'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

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

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [brandsRef, brandsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background con efecto parallax suave */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src="/images/hero-bg.jpg"
            alt="Muñe Chic Boutique"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>

        {/* Contenido centrado con diseño elegante */}
        <div className="container-main relative z-10 text-white text-center max-w-4xl mx-auto backdrop-blur-sm bg-black/10 py-16">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light tracking-wider uppercase">Bienvenida a</h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                Muñe Chic
                <span className="block text-2xl md:text-3xl mt-4 font-light tracking-widest">BOUTIQUE</span>
      </h1>
            </motion.div>

            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
            >
              Descubre nuestra exclusiva colección de moda y accesorios para expresar tu estilo único.
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <Link 
                href="/productos" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 text-lg tracking-wider rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Ver Colección
              </Link>
              <a 
                href="https://wa.me/tunumero"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg tracking-wider rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Contactar
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-white/80">Descubre más</span>
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white/80"
            >
              <path 
                d="M12 4L12 20M12 20L18 14M12 20L6 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </div>
      </motion.section>

      {/* Categorías Destacadas */}
      <motion.section 
        ref={categoriesRef}
        initial="hidden"
        animate={categoriesInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="container-main py-16 bg-gradient-to-b from-white to-gray-50/50"
      >
        <motion.div variants={fadeIn} className="text-center mb-12 space-y-4">
          <span className="text-sm uppercase tracking-[0.2em] text-secondary">Explora</span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Categorías Destacadas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Descubre nuestra selección exclusiva de productos cuidadosamente elegidos para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            variants={fadeIn}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img
              src="/images/ropa.jpg"
              alt="Ropa"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="relative z-20 h-full flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-semibold mb-2">Ropa</h3>
              <p className="text-white/80 mb-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Las últimas tendencias en moda femenina
              </p>
              <Link 
                href="/productos?categoria=ropa"
                className="inline-flex items-center text-white text-sm tracking-wider uppercase hover:text-primary transition-colors"
              >
                Ver colección
                <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img
              src="/images/zapatos.jpg"
              alt="Zapatos"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="relative z-20 h-full flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-semibold mb-2">Zapatos</h3>
              <p className="text-white/80 mb-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Calzado elegante para cada ocasión
              </p>
              <Link 
                href="/productos?categoria=zapatos"
                className="inline-flex items-center text-white text-sm tracking-wider uppercase hover:text-primary transition-colors"
              >
                Ver colección
                <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img
              src="/images/accesorios.jpg"
              alt="Accesorios"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="relative z-20 h-full flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-semibold mb-2">Accesorios</h3>
              <p className="text-white/80 mb-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Complementos que marcan la diferencia
              </p>
              <Link 
                href="/productos?categoria=accesorios"
                className="inline-flex items-center text-white text-sm tracking-wider uppercase hover:text-primary transition-colors"
              >
                Ver colección
                <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Marcas Destacadas */}
      <motion.section 
        ref={brandsRef}
        initial="hidden"
        animate={brandsInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="container-main py-16 bg-gradient-to-b from-gray-50/50 to-white"
      >
        <motion.div variants={fadeIn} className="text-center mb-12 space-y-4">
          <span className="text-sm uppercase tracking-[0.2em] text-secondary">Nuestras Marcas</span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Marcas Destacadas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Trabajamos con las mejores marcas para ofrecerte productos de alta calidad
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-[3/2] relative mb-6">
                  <img 
                    src={`/images/marca${index}.png`}
                    alt={`Marca ${index}`}
                    className="absolute inset-0 w-full h-full object-contain filter transition-all duration-300 group-hover:brightness-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3">Marca {index}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Descripción breve de la marca y sus productos destacados.
                  </p>
                  <Link 
                    href={`/marcas/${index}`}
                    className="inline-flex items-center text-secondary text-sm tracking-wider uppercase hover:text-secondary-dark transition-colors group-hover:gap-2"
                  >
                    Ver productos
                    <svg 
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={fadeIn}
          className="mt-16 text-center"
        >
          <Link 
            href="/marcas"
            className="inline-flex items-center gap-2 text-lg font-medium text-secondary hover:text-secondary-dark transition-colors"
          >
            Ver todas las marcas
            <svg 
              className="w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </motion.div>
      </motion.section>

      {/* Sobre Nosotros */}
      <motion.section 
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="container-main py-16 bg-gradient-to-b from-white to-gray-50/50"
      >
        <motion.div variants={fadeIn} className="text-center mb-12 space-y-4">
          <span className="text-sm uppercase tracking-[0.2em] text-secondary">Conócenos</span>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Sobre Muñe Chic</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Más que una boutique, somos tu destino de moda donde cada prenda cuenta una historia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            variants={fadeIn}
            className="relative"
          >
            <div className="absolute inset-0 -translate-x-4 -translate-y-4 border-2 border-primary/20 rounded-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl aspect-[5/3]">
              <img
                src="/images/about.jpg"
                alt="Nuestra Historia"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="space-y-6"
          >
            <h3 className="text-3xl font-semibold">Nuestra Historia</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Fundada con la visión de ofrecer moda de calidad a precios accesibles, 
                Muñe Chic ha crecido hasta convertirse en un referente de estilo en la región.
              </p>
              <p>
                Nuestra cuidadosa selección de productos y marcas refleja nuestro 
                compromiso con la calidad y la satisfacción de nuestros clientes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-secondary mb-2">5+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-secondary mb-2">1000+</div>
                <div className="text-sm text-gray-600">Clientes Felices</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeIn} className="text-center mb-12">
          <h3 className="text-3xl font-semibold mb-8">Nuestros Valores</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            variants={fadeIn}
            className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">✨</span>
            </div>
            <h4 className="text-xl font-semibold mb-4">Calidad</h4>
            <p className="text-gray-600">
              Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad y durabilidad.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">👥</span>
            </div>
            <h4 className="text-xl font-semibold mb-4">Atención Personalizada</h4>
            <p className="text-gray-600">
              Brindamos asesoramiento experto para ayudarte a encontrar el estilo perfecto para ti.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">💫</span>
            </div>
            <h4 className="text-xl font-semibold mb-4">Innovación</h4>
            <p className="text-gray-600">
              Nos mantenemos al día con las últimas tendencias para ofrecerte lo mejor de la moda.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={fadeIn}
          className="rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 p-12 text-center"
        >
          <h3 className="text-3xl font-semibold mb-6">
            ¿Lista para descubrir tu estilo?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Visítanos o contáctanos por WhatsApp para una atención personalizada.
          </p>
          <motion.a
            href="https://wa.me/tunumero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-lg text-secondary hover:text-secondary-dark transition-colors shadow-md hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactar ahora
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* CTA Final */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-b from-gray-50/50 to-white"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-white to-secondary/30 opacity-50" />
        
        <div className="container-main relative py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-secondary">Tu Estilo, Tu Momento</span>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                ¿Lista para Renovar tu Estilo?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descubre nuestra colección exclusiva y encuentra las piezas perfectas para expresar tu personalidad
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link 
                href="/productos"
                className="group relative overflow-hidden rounded-xl bg-black px-8 py-4 text-white transition-all duration-300 hover:bg-gray-900 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2 text-lg">
                  Ver Colección
                  <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              <a 
                href="https://wa.me/tunumero"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm px-8 py-4 text-secondary border-2 border-secondary/20 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2 text-lg">
                  Contactar por WhatsApp
                  <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-12 flex justify-center gap-12 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                <div className="text-sm text-gray-600">Satisfacción<br/>Garantizada</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-sm text-gray-600">Atención<br/>Personalizada</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">15%</div>
                <div className="text-sm text-gray-600">Descuento<br/>Primera Compra</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl" />
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
        href={href}
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