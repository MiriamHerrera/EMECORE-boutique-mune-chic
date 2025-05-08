'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const brands = [
  {
    name: "Marca 1",
    logo: "/images/marca1.png",
    description: "Descripción de la marca 1 y sus productos destacados."
  },
  {
    name: "Marca 2",
    logo: "/images/marca2.png",
    description: "Descripción de la marca 2 y sus productos destacados."
  },
  {
    name: "Marca 3",
    logo: "/images/marca3.png",
    description: "Descripción de la marca 3 y sus productos destacados."
  },
  {
    name: "Marca 4",
    logo: "/images/marca4.png",
    description: "Descripción de la marca 4 y sus productos destacados."
  }
];

export default function BrandsPage() {
  return (
    <div className="container-main py-12">
      <motion.h1 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-4xl font-bold text-center mb-12"
      >
        Nuestras Marcas
      </motion.h1>
      
      <div className="grid gap-12">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className={`grid md:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 object-contain mx-auto mb-6"
              />
              <h2 className="text-2xl font-semibold mb-4">{brand.name}</h2>
              <p className="text-gray-600">{brand.description}</p>
            </div>
            
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={`/images/brand-${index + 1}.jpg`}
                alt={`Productos ${brand.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">
          ¿Interesado en nuestras marcas?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Contáctanos por WhatsApp para conocer más sobre nuestros productos y marcas disponibles.
        </p>
        <motion.a
          href="https://wa.me/tunumero"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contactar ahora
        </motion.a>
      </motion.div>
    </div>
  );
} 