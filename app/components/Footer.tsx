'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">Muñe Chic</h3>
            <p className="text-gray-300 mb-4">
              Tu destino premium de moda con las mejores marcas y productos de calidad.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/productos" className="text-gray-300 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/marcas" className="text-gray-300 hover:text-white transition-colors">
                  Marcas
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto y redes sociales */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/tunumero"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </a>
              <a
                href="https://facebook.com/munechic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook className="mr-2" />
                Facebook
              </a>
              <a
                href="https://instagram.com/munechic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram className="mr-2" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Muñe Chic. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 