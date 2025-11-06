import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Category {
  handle: string
  title: string
  description: string
  count: number
}

interface FeaturedCategoriesProps {
  categories: Category[]
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[rgb(247,247,247)] via-[rgb(240,240,240)] to-white">
      <div className="page-container py-20 md:py-32">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8" style={{color: 'rgb(23, 72, 76)', letterSpacing: '-0.03em'}}>
            Explora Nuestras Colecciones
          </h2>
          <p className="text-lg md:text-xl" style={{color: 'rgb(23, 72, 76)', opacity: 0.7}}>
            Encuentra la joya perfecta para tu estilo. Calidad certificada en cada pieza.
          </p>
        </div>

        {/* Botones centrados y más pequeños */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl space-y-4">
            {categories.map((category) => (
            <Link
              key={category.handle}
              href={`/collections/${category.handle}`}
              className="group block"
            >
              <div className="relative bg-white border-2 border-[rgb(23,72,76)]/10 rounded-2xl p-8 md:p-10 hover:border-[rgb(23,72,76)] hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3 group-hover:text-[rgb(23,72,76)] transition-colors" style={{color: 'rgb(23, 72, 76)', letterSpacing: '-0.02em'}}>
                      {category.title}
                    </h3>
                    <p className="text-base md:text-lg" style={{color: 'rgb(23, 72, 76)', opacity: 0.6}}>
                      {category.count} productos disponibles
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[rgb(23,72,76)]/5 group-hover:bg-[rgb(23,72,76)] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <ArrowRight
                        size={28}
                        className="text-[rgb(23,72,76)] group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-[rgb(23,72,76)]/5 overflow-hidden">
                  <div className="h-full bg-[rgb(23,72,76)] w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-3 text-lg font-semibold group"
            style={{color: 'rgb(23, 72, 76)'}}
          >
            <span className="border-b-2 border-transparent group-hover:border-[rgb(23,72,76)] transition-all">
              Ver todas las colecciones
            </span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
