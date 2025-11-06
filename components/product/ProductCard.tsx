'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  handle: string
  title: string
  price: string
  image: string
  available: boolean
  vendor?: string
}

export default function ProductCard({
  handle,
  title,
  price,
  image,
  available,
  vendor
}: ProductCardProps) {
  // Formatear precio
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(parseFloat(price))

  return (
    <article className="product-card animate-fade-in">
      <Link href={`/products/${handle}`}>
        <div className="product-card-image">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
            priority={false}
          />

          {/* Badge de disponibilidad */}
          {!available && (
            <div className="absolute top-3 right-3 bg-[rgb(225,29,72)] text-white text-xs px-3 py-1.5 rounded-full uppercase font-medium tracking-wide">
              Agotado
            </div>
          )}
        </div>
      </Link>

      {/* Info del producto */}
      <div className="flex flex-col gap-1">
        {/* Vendor/Marca */}
        {vendor && (
          <p className="product-card-vendor">
            {vendor}
          </p>
        )}

        {/* Título */}
        <Link href={`/products/${handle}`}>
          <h3 className="product-card-title hover:opacity-70 transition-opacity">
            {title}
          </h3>
        </Link>

        {/* Precio */}
        <p className="product-card-price mt-1">
          {precioFormateado}
        </p>

        {/* Botón agregar al carrito */}
        {available && (
          <button
            className="btn-primary mt-2 w-full"
            onClick={(e) => {
              e.preventDefault()
              console.log('Agregar al carrito:', title)
            }}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  )
}
