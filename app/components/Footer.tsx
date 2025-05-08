'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-24">
      <div className="container-main px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Logo y descripción */}
          <div className="space-y-8">
            <div className="flex items-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Muñe Chic
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu destino premium de moda con las mejores marcas y productos de calidad. 
              Descubre las últimas tendencias en ropa y accesorios.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com/munechic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://instagram.com/munechic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://wa.me/tunumero"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaWhatsapp size={28} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-8 relative">
              Enlaces Rápidos
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-pink-500"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/productos" className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Productos</span>
                </Link>
              </li>
              <li>
                <Link href="/marcas" className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Marcas</span>
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Sobre Nosotros</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-pink-500 transition-colors duration-300 flex items-center">
                  <span className="hover:translate-x-2 transition-transform duration-300">Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xl font-semibold mb-8 relative">
              Contacto
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-pink-500"></span>
            </h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-gray-300">
                <FaMapMarkerAlt className="text-pink-500" size={20} />
                <span>Av. Principal #123, Ciudad</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <FaPhone className="text-pink-500" size={20} />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <FaEnvelope className="text-pink-500" size={20} />
                <span>contacto@munechic.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-8 relative">
              Newsletter
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-pink-500"></span>
            </h4>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Suscríbete para recibir las últimas novedades y ofertas especiales.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 text-white"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300 font-medium"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-20 pt-10 text-center text-gray-400">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Muñe Chic. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 