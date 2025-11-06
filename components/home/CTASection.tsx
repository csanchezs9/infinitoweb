import Link from 'next/link'
import { Phone, MapPin, MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-white">
      <div className="page-container py-20 md:py-32">
      <div className="bg-gradient-to-br from-[rgb(23,72,76)] to-[rgb(35,85,90)] rounded-[var(--radius-card)] overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 p-12 md:p-20 lg:p-28">
          {/* Contenido */}
          <div className="text-white flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-10" style={{letterSpacing: '-0.03em'}}>
              ¿Listo para tu próximo piercing?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/95 leading-relaxed">
              Visítanos en nuestra tienda física en Medellín o contáctanos
              por WhatsApp para asesoría personalizada.
            </p>

            {/* Información de contacto */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-3">
                <MapPin size={24} className="flex-shrink-0 mt-1 text-[rgb(221,231,194)]" />
                <div>
                  <p className="font-medium">Calle 52 # 46-22</p>
                  <p className="text-sm text-white/80">CC Paseo de La Playa, Local 168-169</p>
                  <p className="text-sm text-white/80">Medellín, Colombia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={24} className="flex-shrink-0 text-[rgb(221,231,194)]" />
                <p className="font-medium">+57 316 222 5034</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/573162225034"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-[rgb(221,231,194)] text-[rgb(23,72,76)] hover:bg-white inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>Contactar por WhatsApp</span>
              </a>
              <Link
                href="/collections/all"
                className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-[rgb(23,72,76)] inline-flex items-center justify-center"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>

          {/* Visual decorativo */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Círculos decorativos */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-4 border-white/20"></div>
              </div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-4 border-white/10"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-bold mb-4 text-[rgb(221,231,194)]">∞</div>
                  <p className="text-2xl font-bold uppercase">Infinito</p>
                  <p className="text-lg text-white/80">Piercing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
