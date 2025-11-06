# ∞ Infinito Piercing E-commerce

E-commerce inspirado en bracarli.com para Infinito Piercing, construido con Next.js 14, TypeScript, Tailwind CSS y Prisma.

## 🚀 Características

- ✅ Sincronización automática con API de Shopify
- ✅ Base de datos local SQLite (184 productos sincronizados)
- ✅ Diseño inspirado en bracarli.com
- ✅ Grid de productos responsive
- ✅ Colecciones organizadas por categorías
- ✅ Imágenes optimizadas con Next.js Image
- ✅ Animaciones y transiciones suaves
- ✅ TypeScript para type safety

## 📦 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de datos**: SQLite + Prisma ORM
- **Fuentes**: Jost (igual a bracarli.com)
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion

## 🛠️ Instalación

Ya está todo configurado. Para iniciar el proyecto:

\`\`\`bash
# Iniciar servidor de desarrollo
npm run dev
\`\`\`

El sitio estará disponible en: http://localhost:3000

## 📊 Datos Sincronizados

- **30 colecciones** organizadas por categorías
- **184 productos** con todas sus variantes
- **465 imágenes** de productos
- **692 variantes** de productos

## 🔄 Re-sincronizar Productos

Para actualizar los productos desde Shopify:

\`\`\`bash
npm run sync
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
infinito-ecommerce/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Página principal
│   ├── layout.tsx               # Layout global
│   ├── globals.css              # Estilos globales
│   └── collections/
│       └── [handle]/
│           └── page.tsx         # Página de colección
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Header con navegación
│   │   └── Footer.tsx           # Footer
│   └── product/
│       ├── ProductCard.tsx      # Tarjeta de producto
│       └── ProductGrid.tsx      # Grid de productos
├── lib/
│   ├── prisma.ts                # Cliente Prisma
│   └── shopify-service.js       # Servicio de Shopify API
├── prisma/
│   ├── schema.prisma            # Schema de DB
│   └── dev.db                   # Base de datos SQLite
└── scripts/
    └── sync-shopify.js          # Script de sincronización
\`\`\`

## 🎨 Diseño

Inspirado en bracarli.com con:
- Fuente Jost
- Colores primarios: rgb(23, 72, 76)
- Animaciones al hacer hover (scale 1.02)
- Grid responsive de productos
- Navegación limpia y simple

## 📱 Responsive

- **Mobile**: Grid 2 columnas
- **Tablet**: Grid 3 columnas
- **Desktop**: Grid 4 columnas

## 🔍 Comandos Útiles

\`\`\`bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Iniciar producción
npm run start

# Sincronizar productos
npm run sync

# Ver base de datos
npm run db:studio

# Generar cliente Prisma
npm run db:generate
\`\`\`

## 📈 Próximos Pasos

- [ ] Implementar carrito de compras con Zustand
- [ ] Agregar búsqueda predictiva
- [ ] Crear página de detalle de producto
- [ ] Implementar filtros avanzados
- [ ] Agregar sistema de checkout
- [ ] Optimizar SEO con metadata
- [ ] Añadir animaciones con Framer Motion

## 💡 Notas

- Los productos se cargan desde la base de datos local (dev.db)
- No hay llamadas a Shopify API en runtime (ultra rápido)
- Las imágenes se optimizan automáticamente con Next.js
- La base de datos se puede actualizar cuando quieras con `npm run sync`
