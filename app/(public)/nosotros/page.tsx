'use client';

import { motion } from 'framer-motion';

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

export default function AboutPage() {
  return (
    <div className="container-main py-12">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="text-center mb-16"
      >
        <motion.h1 variants={fadeIn} className="mb-6">
          Sobre Muñe Chic
        </motion.h1>
        <motion.p variants={fadeIn} className="text-xl text-gray-600 max-w-3xl mx-auto">
          En Muñe Chic, nos apasiona ayudarte a expresar tu estilo único a través 
          de la moda. Somos más que una boutique; somos tu destino para encontrar 
          las mejores prendas y accesorios.
        </motion.p>
      </motion.div>

      {/* Nuestra Historia */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="mb-20"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-semibold mb-6">Nuestra Historia</h2>
            <p className="text-gray-600 mb-4">
              Fundada con la visión de ofrecer moda de calidad a precios accesibles, 
              Muñe Chic ha crecido hasta convertirse en un referente de estilo en la región.
            </p>
            <p className="text-gray-600">
              Nuestra cuidadosa selección de productos y marcas refleja nuestro 
              compromiso con la calidad y la satisfacción de nuestros clientes.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="rounded-lg overflow-hidden">
            <img
              src="/images/historia.jpg"
              alt="Historia de Muñe Chic"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Valores */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="mb-20"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-semibold text-center mb-12">
          Nuestros Valores
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ValueCard
            title="Calidad"
            description="Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad."
            icon="🌟"
          />
          <ValueCard
            title="Servicio"
            description="Brindamos atención personalizada para ayudarte a encontrar lo que buscas."
            icon="👥"
          />
          <ValueCard
            title="Innovación"
            description="Nos mantenemos al día con las últimas tendencias de la moda."
            icon="💡"
          />
        </div>
      </motion.section>

      {/* Equipo */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="mb-20"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-semibold text-center mb-12">
          Nuestro Equipo
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMember
            name="María González"
            role="Fundadora"
            image="/images/team-1.jpg"
          />
          <TeamMember
            name="Carlos Rodríguez"
            role="Gerente de Tienda"
            image="/images/team-2.jpg"
          />
          <TeamMember
            name="Ana Martínez"
            role="Asesora de Moda"
            image="/images/team-3.jpg"
          />
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-primary rounded-lg p-12 text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">
          ¿Lista para descubrir tu estilo?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Visítanos o contáctanos por WhatsApp para una atención personalizada.
        </p>
        <motion.a
          href="https://wa.me/tunumero"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contactar ahora
        </motion.a>
      </motion.section>
    </div>
  );
}

function ValueCard({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: string; 
}) {
  return (
    <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function TeamMember({ 
  name, 
  role, 
  image 
}: { 
  name: string; 
  role: string; 
  image: string; 
}) {
  return (
    <motion.div variants={fadeIn} className="text-center">
      <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </motion.div>
  );
} 