'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ShieldCheck, Sparkles, Award, Heart } from 'lucide-react'

const tiendaPhotos = [
  '/images/Tienda/313865404_1802413730136462_2372650505547453911_n.jpg',
  '/images/Tienda/317833240_3397466973816289_7917534047262080995_n.jpg',
  '/images/Tienda/317882734_557755069476079_221085020699477683_n.jpg',
  '/images/Tienda/317925059_1127006341288968_4089242232516585260_n.jpg',
  '/images/Tienda/318095739_438256288337998_3073011261267935519_n.jpg',
  '/images/Tienda/318157053_1600923587001978_6535632270574554590_n.jpg',
]

const servicios = [
  { icon: ShieldCheck, title: 'Materiales Certificados', desc: 'Titanio grado implante y oro' },
  { icon: Sparkles, title: 'Ambiente Esterilizado', desc: 'Normas internacionales' },
  { icon: Award, title: 'Profesionales', desc: 'Equipo capacitado' },
  { icon: Heart, title: 'Tu Seguridad Primero', desc: 'Garantía total' }
]

export default function AboutSection() {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Animaciones GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8
      })
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.4')
      .from(cardsRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        clearProps: "all"
      }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Carousel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % tiendaPhotos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="bg-white overflow-hidden" ref={sectionRef}>
      <div className="page-container py-16 md:py-24">

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Izquierda - Carousel de fotos */}
          <div className="relative">
            {/* Banner/Carousel */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              {tiendaPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: currentPhoto === idx ? 1 : 0 }}
                >
                  <Image
                    src={photo}
                    alt="Infinito Piercing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Overlay con texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Badge sobre la imagen */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg">
                <p className="text-sm font-bold" style={{color: 'rgb(23, 72, 76)'}}>
                  Medellín, Colombia
                </p>
              </div>

              {/* Indicadores del carousel */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {tiendaPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhoto(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentPhoto === idx ? 'bg-white w-8' : 'bg-white/50 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Derecha - Contenido */}
          <div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6"
              style={{color: 'rgb(23, 72, 76)', letterSpacing: '-0.03em'}}
            >
              Profesionales en Piercing y Joyería
            </h2>

            <div ref={textRef} className="space-y-5 mb-8">
              <p className="text-xl md:text-2xl font-semibold" style={{color: 'rgb(23, 72, 76)'}}>
                En <strong>Infinito Piercing</strong> somos especialistas en perforaciones profesionales y joyería de alta calidad.
              </p>
              <p className="text-lg md:text-xl" style={{color: 'rgb(23, 72, 76)', opacity: 0.8}}>
                Con años de experiencia en Medellín, trabajamos únicamente con <strong>titanio grado implante</strong>, oro y plata certificados. Tu salud y satisfacción son nuestra prioridad.
              </p>
              <p className="text-lg md:text-xl" style={{color: 'rgb(23, 72, 76)', opacity: 0.8}}>
                Nuestro equipo está capacitado para realizar perforaciones de manera segura, con técnicas actualizadas y en un ambiente completamente esterilizado siguiendo normas internacionales.
              </p>
              <div className="flex items-center gap-4 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgb(23,72,76)]"></div>
                  <span className="text-base md:text-lg font-medium" style={{color: 'rgb(23, 72, 76)'}}>+10 años de experiencia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgb(23,72,76)]"></div>
                  <span className="text-base md:text-lg font-medium" style={{color: 'rgb(23, 72, 76)'}}>Certificados</span>
                </div>
              </div>
            </div>

            {/* Grid de servicios - Compacto */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-4">
              {servicios.map((servicio, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-[rgb(247,247,247)] to-white border border-[rgb(23,72,76)]/10 rounded-xl p-6 hover:border-[rgb(23,72,76)]/30 hover:shadow-lg hover:scale-105 transition-all"
                >
                  <servicio.icon size={32} className="mb-3 text-[rgb(23,72,76)]" />
                  <h3 className="text-base md:text-lg font-bold mb-2" style={{color: 'rgb(23, 72, 76)'}}>
                    {servicio.title}
                  </h3>
                  <p className="text-sm md:text-base" style={{color: 'rgb(23, 72, 76)', opacity: 0.7}}>
                    {servicio.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
