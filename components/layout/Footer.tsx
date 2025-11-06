import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24" style={{
      background: 'linear-gradient(135deg, rgb(23, 72, 76) 0%, rgb(35, 85, 90) 100%)'
    }}>
      <div className="page-container py-20 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
          {/* Columna 1 - Info */}
          <div>
            <h3 className="text-xl font-bold uppercase mb-6 text-white tracking-tight">
              INFINITO PIERCING
            </h3>
            <p className="text-sm md:text-base text-white/90 leading-relaxed mb-6">
              Joyería y piercings de alta calidad. Titanio grado implante, oro, plata y más.
            </p>
            <p className="text-sm text-white/70">
              Medellín, Colombia
            </p>
          </div>

          {/* Columna 2 - Enlaces */}
          <div>
            <h4 className="font-semibold uppercase text-white mb-6 text-sm tracking-wide">Comprar</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/collections/oreja" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Oreja
                </Link>
              </li>
              <li>
                <Link href="/collections/nariz" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Nariz
                </Link>
              </li>
              <li>
                <Link href="/collections/bucal" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Bucal
                </Link>
              </li>
              <li>
                <Link href="/collections/corporal" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Corporal
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Materiales */}
          <div>
            <h4 className="font-semibold uppercase text-white mb-6 text-sm tracking-wide">Materiales</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/collections/titanio-grado-implante" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Titanio Grado Implante
                </Link>
              </li>
              <li>
                <Link href="/collections/oro" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Oro
                </Link>
              </li>
              <li>
                <Link href="/collections/plata" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Plata
                </Link>
              </li>
              <li>
                <Link href="/collections/acero" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Acero
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h4 className="font-semibold uppercase text-white mb-6 text-sm tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://wa.me/573162225034" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://instagram.com/infinitopiercing" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Facebook
                </a>
              </li>
              <li>
                <a href="mailto:info@infinitopiercing.com" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-white/20 text-center">
          <p className="text-sm text-white/70">&copy; {new Date().getFullYear()} Infinito Piercing. Todos los derechos reservados.</p>
          <p className="text-xs text-white/50 mt-3">Medellín, Colombia</p>
        </div>
      </div>
    </footer>
  )
}
