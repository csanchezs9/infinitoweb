'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="page-container">
        <div className="flex items-center justify-between py-6 md:py-8">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold uppercase tracking-tight" style={{color: 'rgb(23, 72, 76)'}}>
            INFINITO PIERCING
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/collections/helix" className="nav-link">
              Helix
            </Link>
            <Link href="/collections/flat" className="nav-link">
              Flat
            </Link>
            <Link href="/collections/conch" className="nav-link">
              Conch
            </Link>
            <Link href="/collections/bucal" className="nav-link">
              Bucal
            </Link>
            <Link href="/collections/all" className="nav-link">
              Todos
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="nav-link p-2"
              aria-label="Buscar"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              className="nav-link p-2 relative"
              aria-label="Carrito"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-[rgb(23,72,76)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden nav-link p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 animate-fade-in border-t border-gray-100 pt-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/collections/helix"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Helix
              </Link>
              <Link
                href="/collections/flat"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Flat
              </Link>
              <Link
                href="/collections/conch"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conch
              </Link>
              <Link
                href="/collections/bucal"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bucal
              </Link>
              <Link
                href="/collections/all"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Todos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
