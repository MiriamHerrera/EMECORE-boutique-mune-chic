'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/productos', label: 'Productos' },
    { href: '/marcas', label: 'Marcas' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/admin/login', label: 'Admin', className: 'text-secondary font-medium' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
          {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                className="h-12 w-auto"
                src="/images/logo.png"
                alt="Muñe Chic"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href 
                    ? 'text-secondary' 
                    : 'text-gray-700 hover:text-secondary'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                    initial={false}
                  />
                )}
              </Link>
            ))}
            <a 
              href="https://wa.me/tunumero" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="text-lg" />
              <span>Contactar</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-secondary hover:bg-gray-100/50 focus:outline-none"
          >
            <span className="sr-only">Abrir menú principal</span>
            {isOpen ? (
                <FaTimes className="block h-6 w-6" />
            ) : (
                <FaBars className="block h-6 w-6" />
            )}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'bg-secondary/10 text-secondary'
                      : 'text-gray-700 hover:text-secondary hover:bg-gray-100/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
                    <a
                      href="https://wa.me/tunumero"
                      target="_blank"
                      rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-base font-medium bg-secondary text-white hover:bg-secondary-dark transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                <FaWhatsapp className="text-lg" />
                <span>Contactar</span>
                    </a>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
} 