import ProductCard from './ProductCard'

interface Product {
  id: string
  handle: string
  title: string
  price: string
  available: boolean
  vendor?: string
  images: Array<{ src: string; alt?: string }>
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg uppercase tracking-wide" style={{color: 'rgb(23, 72, 76)', opacity: 0.5}}>
          No se encontraron productos
        </p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          handle={product.handle}
          title={product.title}
          price={product.price}
          image={product.images[0]?.src || '/placeholder.jpg'}
          available={product.available}
          vendor={product.vendor}
        />
      ))}
    </div>
  )
}
