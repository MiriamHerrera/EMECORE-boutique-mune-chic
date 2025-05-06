import { useState } from 'react';
import { Link } from '@remix-run/react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <img 
                src="/images/logo.png" 
                alt="Muñe Chic Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/marcas">Marcas</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <a 
              href="https://wa.me/tunumero" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Contactar
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="block md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Abrir menú principal</span>
            {isOpen ? (
              <HiX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <HiMenu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <img 
                    src="/images/logo.png" 
                    alt="Muñe Chic Logo" 
                    className="h-12 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 px-4 py-6 overflow-y-auto">
                <div className="flex flex-col space-y-6">
                  <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
                    Inicio
                  </MobileNavLink>
                  <MobileNavLink to="/productos" onClick={() => setIsOpen(false)}>
                    Productos
                  </MobileNavLink>
                  <MobileNavLink to="/marcas" onClick={() => setIsOpen(false)}>
                    Marcas
                  </MobileNavLink>
                  <MobileNavLink to="/nosotros" onClick={() => setIsOpen(false)}>
                    Nosotros
                  </MobileNavLink>
                  <div className="pt-4">
                    <a
                      href="https://wa.me/tunumero"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center btn-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Contactar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-gray-700 hover:text-black transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      className="block text-2xl font-medium text-gray-700 hover:text-black"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 