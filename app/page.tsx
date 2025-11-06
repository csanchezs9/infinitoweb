import { prisma } from '@/lib/prisma'
import ProductGrid from '@/components/product/ProductGrid'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import FeaturedCategories from '@/components/home/FeaturedCategories'

async function getProductos() {
  try {
    const productos = await prisma.product.findMany({
      where: {
        available: true
      },
      include: {
        images: {
          orderBy: {
            position: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 8 // Solo 8 productos destacados
    })

    return productos
  } catch (error) {
    console.error('Error obteniendo productos:', error)
    return []
  }
}

async function getColecciones() {
  try {
    const colecciones = await prisma.collection.findMany({
      where: {
        productsCount: {
          gt: 10
        },
        handle: {
          in: ['helix', 'flat', 'conch', 'forward-anti-helix']
        }
      },
      orderBy: {
        productsCount: 'desc'
      },
      take: 4
    })

    return colecciones.map(col => ({
      handle: col.handle,
      title: col.title,
      description: '',
      count: col.productsCount
    }))
  } catch (error) {
    console.error('Error obteniendo colecciones:', error)
    return []
  }
}

export default async function Home() {
  const productos = await getProductos()
  const colecciones = await getColecciones()

  return (
    <main className="flex flex-col">
      {/* Hero Section - Banner Principal */}
      <HeroSection />

      {/* ESPACIO ENTRE BANNER Y ABOUT */}
      <div className="h-16 md:h-24 bg-white"></div>

      {/* About Section - Quiénes Somos */}
      <AboutSection />

      {/* ESPACIO ENTRE ABOUT Y COLECCIONES */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-white to-[rgb(247,247,247)]"></div>

      {/* Featured Categories - Colecciones Destacadas */}
      {colecciones.length > 0 && (
        <FeaturedCategories categories={colecciones} />
      )}

      {/* ESPACIO ENTRE COLECCIONES Y PRODUCTOS */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-white to-white"></div>

      {/* Productos Destacados */}
      <section className="bg-white">
        <div className="page-container py-20 md:py-32">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8" style={{color: 'rgb(23, 72, 76)', letterSpacing: '-0.03em'}}>
              Productos Destacados
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{color: 'rgb(23, 72, 76)', opacity: 0.7}}>
              Descubre nuestras piezas más populares en titanio, oro y plata.
            </p>
          </div>

          <ProductGrid products={productos.map(p => ({
            ...p,
            vendor: p.vendor ?? undefined,
            images: p.images.map(img => ({ src: img.src, alt: img.alt ?? undefined }))
          }))} />
        </div>
      </section>

      {/* ESPACIO ANTES DEL FOOTER */}
      <div className="h-16 md:h-24 bg-white"></div>
    </main>
  )
}
