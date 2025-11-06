import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
})

export const metadata: Metadata = {
  title: 'Infinito Piercing - Joyería y Piercings de Alta Calidad',
  description: 'Tienda de piercings y joyería. Titanio grado implante, oro, plata y más.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={jost.variable}>
        <Header />
        <main className="min-h-screen pt-4 md:pt-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
