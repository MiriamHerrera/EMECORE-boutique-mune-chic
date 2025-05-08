# Muñe Chic - Boutique E-commerce

Plataforma de comercio electrónico para la boutique Muñe Chic, con panel de administración y catálogo de productos.

## Características

- Panel de administración para gestión de productos y categorías
- Catálogo de productos con filtros y búsqueda
- Gestión de imágenes de productos
- Diseño responsive y moderno
- Autenticación y autorización
- Notificaciones y confirmaciones
- Optimización de imágenes
- SEO friendly

## Tecnologías

- Next.js 14
- React 18
- TypeScript
- MySQL
- Tailwind CSS
- Framer Motion
- React Icons

## Requisitos

- Node.js 18 o superior
- MySQL 8.0 o superior

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/mune-chic.git
cd mune-chic
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con tus configuraciones.

4. Crear la base de datos:
```bash
mysql -u root -p
```
```sql
CREATE DATABASE mune_chic;
```

5. Ejecutar migraciones:
```bash
npm run migrate
```

6. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
mune-chic/
├── app/                    # Código fuente de la aplicación
│   ├── admin/             # Panel de administración
│   ├── api/               # API endpoints
│   ├── components/        # Componentes reutilizables
│   ├── hooks/             # Custom hooks
│   ├── lib/              # Utilidades y configuraciones
│   ├── styles/           # Estilos globales
│   └── types/            # TypeScript types
├── public/               # Archivos estáticos
├── migrations/          # Migraciones de base de datos
└── scripts/            # Scripts de utilidad
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter
- `npm run typecheck`: Verifica tipos de TypeScript

## Contribuir

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter)

Link del proyecto: [https://github.com/tu-usuario/mune-chic](https://github.com/tu-usuario/mune-chic)

## Estructura de Carpetas

```
app/
├── page.tsx (Inicio)
├── productos/
│   └── page.tsx (Productos)
├── marcas/
│   └── page.tsx (Marcas)
├── nosotros/
│   └── page.tsx (Sobre Nosotros)
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
└── layout.tsx (Layout principal)
``` 