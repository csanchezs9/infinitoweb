import { prisma } from '@/lib/prisma'
import ProductGrid from '@/components/product/ProductGrid'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    handle: string
  }>
}

async function getColeccion(handle: string) {
  try {
    return await prisma.collection.findUnique({
      where: { handle }
    })
  } catch (error) {
    console.error('Error obteniendo colección:', error)
    return null
  }
}

async function getProductosPorColeccion(handle: string) {
  try {
    // Capitalizar primera letra para coincidir con los tags
    const searchTerm = handle.charAt(0).toUpperCase() + handle.slice(1);

    const productos = await prisma.product.findMany({
      where: {
        available: true,
        OR: [
          { tags: { contains: searchTerm } },
          { tags: { contains: handle } },
          { productType: { contains: handle } }
        ]
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
      }
    })

    return productos
  } catch (error) {
    console.error('Error obteniendo productos:', error)
    return []
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { handle } = await params

  const coleccion = await getColeccion(handle)

  const productos = handle === 'all'
    ? await prisma.product.findMany({
        where: { available: true },
        include: {
          images: {
            orderBy: { position: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    : await getProductosPorColeccion(handle)

  // Si no hay colección ni productos, entonces sí mostrar 404
  if (!coleccion && productos.length === 0 && handle !== 'all') {
    notFound()
  }

  // Título: usar el de la colección o capitalizar el handle
  const titulo = coleccion?.title || handle.charAt(0).toUpperCase() + handle.slice(1)

  return (
    <div className="page-container py-8 md:py-12">
      {/* Header de la colección */}
      <div className="mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4" style={{color: 'rgb(23, 72, 76)', letterSpacing: '-0.03em'}}>
          {titulo}
        </h1>

        {coleccion?.description && (
          <p className="text-base md:text-lg max-w-3xl mt-4" style={{color: 'rgb(23, 72, 76)', opacity: 0.7, lineHeight: 1.6}}>
            {coleccion.description.replace(/<[^>]*>/g, '')}
          </p>
        )}

        <p className="text-sm mt-4 uppercase tracking-wide" style={{color: 'rgb(23, 72, 76)', opacity: 0.5}}>
          {productos.length} productos
        </p>
      </div>

      {/* Grid de productos */}
      <ProductGrid products={productos.map(p => ({
        ...p,
        vendor: p.vendor ?? undefined,
        images: p.images.map(img => ({ src: img.src, alt: img.alt ?? undefined }))
      }))} />
    </div>
  )
}
