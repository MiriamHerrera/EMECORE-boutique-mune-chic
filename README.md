# Mune Chic - Sistema de Gestión de Boutique

Sistema de gestión para boutique con funcionalidades de administración de productos, categorías, atributos y variantes.

## Características

- Gestión de categorías y subcategorías
- Gestión de atributos y valores de atributos
- Gestión de productos con imágenes
- Gestión de variantes de productos
- Interfaz administrativa moderna y responsive
- API RESTful para todas las operaciones

## Requisitos

- Node.js 18.x o superior
- MySQL 8.x o superior
- npm o yarn

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
Editar el archivo `.env` con tus credenciales de base de datos.

4. Ejecutar las migraciones:
```bash
node scripts/run-migration.js
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
mune-chic/
├── app/                    # Aplicación Next.js
│   ├── api/               # Endpoints de la API
│   ├── admin/             # Panel de administración
│   └── (routes)/          # Rutas públicas
├── components/            # Componentes React
├── lib/                   # Utilidades y configuraciones
├── migrations/           # Scripts de migración SQL
├── public/               # Archivos estáticos
└── styles/              # Estilos globales
```

## Tecnologías Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MySQL
- Prisma

## Licencia

MIT 