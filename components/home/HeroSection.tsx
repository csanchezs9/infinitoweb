'use client'

import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles, MapPin, Play, Pause } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Videos y contenido del hero
const heroContent = [
  {
    type: 'video',
    src: '/images/AQN8RAeAodMvKhehDon3p9xsC9yoZlaeRAPzByLdFTvzQcTEzbyuuvcHJ3RhOwvZ97bGkoRXcx7UfLZH9vf_YjFWP1WncRZe1Ueez20.mp4',
    title: '¿Piercing?',
    highlight: 'Hágalo con profesionales',
    description: 'Joyería de alta calidad en titanio grado implante, oro y plata.'
  },
  {
    type: 'video',
    src: '/images/AQPUC3w3tgY5GxhulYRp0eWUrBGTY5YOQkdmfqma8_96Bo91bObcktuI_B5fPFLc9ZDi8SmS8X-W8DRhdeqieBrqES3gMA1u5V1RjuY.mp4',
    title: 'Calidad',
    highlight: 'Certificada y Garantizada',
    description: 'Materiales certificados para tu tranquilidad y seguridad.'
  },
  {
    type: 'video',
    src: '/images/AQPXy9V73coSFp39GhhIIcdl7xiLa7YYShz7uNoVNbZ5ZGCR9VLzkU3D94u4wnHNdS2nKNkco0p7rjuv4J13qFTQh4C35Srqil7a_Xo.mp4',
    title: 'Estilo',
    highlight: 'Único y Personal',
    description: 'Encuentra la pieza perfecta que refleje tu personalidad.'
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // Animación inicial al cargar
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(badgeRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3
      })
      .from(titleRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2
      }, '-=0.5')
      .from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 1
      }, '-=0.8')
      .from(ctaRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
      }, '-=0.6')
      .from(statsRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
      }, '-=0.5')
    })

    return () => ctx.revert()
  }, [])

  // Cambio automático de slides
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      changeSlide((currentSlide + 1) % heroContent.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [currentSlide, isPlaying])

  // Función para cambiar slides con animaciones GSAP
  const changeSlide = (newIndex: number) => {
    if (newIndex === currentSlide) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Fade out del contenido actual
      tl.to([titleRef.current, descRef.current, ctaRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.in'
      })

      // Cambiar el slide
      tl.call(() => {
        setCurrentSlide(newIndex)
      })

      // Fade in del nuevo contenido
      tl.fromTo([titleRef.current, descRef.current, ctaRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }, '+=0.2')

      // Animación del overlay
      tl.fromTo(overlayRef.current,
        { opacity: 0.3 },
        { opacity: 1, duration: 0.5 },
        0
      )
    })

    return () => ctx.revert()
  }

  // Play/Pause de videos
  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentSlide]
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause()
      } else {
        currentVideo.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Auto-play de videos
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide && isPlaying) {
          video.play().catch(() => {
            // Manejo silencioso de errores de autoplay
          })
        } else {
          video.pause()
        }
      }
    })
  }, [currentSlide, isPlaying])

  const content = heroContent[currentSlide]

  return (
    <section className="relative overflow-hidden min-h-[90vh] md:min-h-[95vh] flex items-center">
      {/* Background con Videos */}
      <div className="absolute inset-0 bg-black">
        {heroContent.map((item, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === idx ? 1 : 0 }}
          >
            <video
              ref={(el) => { videoRefs.current[idx] = el }}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={item.src} type="video/mp4" />
            </video>
            {/* Overlay con gradiente dinámico */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
            ></div>
          </div>
        ))}
      </div>

      <div className="page-container relative z-10 py-24 md:py-32 lg:py-40 w-full">
        <div ref={contentRef} className="max-w-6xl mx-auto text-center text-white">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-full text-sm uppercase tracking-wider mb-12 border border-white/30 shadow-2xl"
          >
            <Sparkles size={18} className="text-[rgb(221,231,194)]" />
            <span className="font-medium">Profesionales en Piercing</span>
          </div>

          {/* Título principal con animación */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-tight mb-10"
            style={{letterSpacing: '-0.03em'}}
          >
            <span className="block drop-shadow-2xl" style={{textShadow: '0 4px 30px rgba(0,0,0,0.7)'}}>
              {content.title}
            </span>
            <span className="block text-[rgb(221,231,194)] drop-shadow-2xl mt-4" style={{textShadow: '0 4px 30px rgba(0,0,0,0.7)'}}>
              {content.highlight}
            </span>
          </h1>

          {/* Subtítulo */}
          <p
            ref={descRef}
            className="text-xl md:text-2xl lg:text-3xl mb-16 text-white/95 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-xl"
          >
            {content.description}
            <span className="block mt-3 text-[rgb(221,231,194)] font-normal">Medellín, Colombia</span>
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link
              href="/collections/all"
              className="btn-primary bg-white text-[rgb(23,72,76)] hover:bg-[rgb(221,231,194)] hover:scale-105 border-white w-full sm:w-auto px-12 py-6 text-lg font-semibold flex items-center justify-center gap-3 group shadow-2xl transition-all duration-300"
            >
              <span>Explorar Productos</span>
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              href="#about"
              className="btn-primary bg-white/10 backdrop-blur-xl border-2 border-white hover:bg-white hover:text-[rgb(23,72,76)] w-full sm:w-auto px-12 py-6 text-lg font-semibold shadow-2xl transition-all duration-300"
            >
              Conocer Más
            </Link>
          </div>

          {/* Stats/Features con animación stagger */}
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, title: 'Calidad Garantizada', desc: 'Materiales certificados' },
              { icon: Sparkles, title: 'Envío Gratis', desc: 'Desde $250.000 COP' },
              { icon: MapPin, title: 'Tienda Física', desc: 'Medellín, Colombia' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-xl rounded-[var(--radius-card)] p-8 md:p-10 border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-500 hover:scale-105 group"
              >
                <stat.icon size={44} className="mx-auto mb-5 text-[rgb(221,231,194)] group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold text-xl mb-3">{stat.title}</h3>
                <p className="text-base text-white/90">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all border border-white/30"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Indicadores de slides */}
        <div className="flex gap-3">
          {heroContent.map((_, idx) => (
            <button
              key={idx}
              onClick={() => changeSlide(idx)}
              className={`h-3 rounded-full transition-all duration-500 ${
                currentSlide === idx
                  ? 'bg-white w-12'
                  : 'bg-white/40 hover:bg-white/60 w-3'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator con animación */}
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-sm uppercase tracking-wider rotate-90 transform origin-center">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-white/40"></div>
        </div>
      </div>
    </section>
  )
}
