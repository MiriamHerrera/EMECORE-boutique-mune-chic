import { useState } from 'react';
import { Link } from '@remix-run/react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Muñe Chic Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
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
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
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
          <div className="px-2 pt-2">
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
      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 