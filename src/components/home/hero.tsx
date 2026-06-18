'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ROUTES } from '@/src/constants/routes'

const slides = [
  {
    imagen:
      'https://res.cloudinary.com/ds0tjwccs/image/upload/v1779898731/large_Whats_App_Image_2024_01_24_at_10_38_22_AM_13_1_p3eu3c_569c0d75fb.png',
    titulo: 'Escuela de Posgrado',
    subtitulo: 'Universidad Nacional de San Antonio Abad del Cusco',
    descripcion:
      'Formamos líderes e investigadores comprometidos con el desarrollo científico, tecnológico y humanístico de la región y el país, a través de programas académicos de excelencia.',
    botonTexto: 'Ver comunicados',
    botonRuta: ROUTES.COMUNICADOS,
    alt: 'Campus universitario UNSAAC',
  },
  {
    imagen:
      'https://res.cloudinary.com/ds0tjwccs/image/upload/v1779898731/large_Whats_App_Image_2024_01_24_at_10_38_22_AM_13_1_p3eu3c_569c0d75fb.png',
    titulo: 'Formación de Excelencia',
    subtitulo: 'Maestrías y Doctorados Acreditados',
    descripcion:
      'Programas académicos diseñados para formar líderes con alto nivel de competencia, innovación y compromiso social en cada área del conocimiento.',
    botonTexto: 'Explorar programas',
    botonRuta: '/maestrias',
    alt: 'Estudiantes en aula de posgrado',
  },
  {
    imagen:
      'https://res.cloudinary.com/ds0tjwccs/image/upload/v1779898731/large_Whats_App_Image_2024_01_24_at_10_38_22_AM_13_1_p3eu3c_569c0d75fb.png',
    titulo: 'Investigación e Innovación',
    subtitulo: 'Comprometidos con el Desarrollo Regional',
    descripcion:
      'Impulsamos la investigación científica y tecnológica como motor de transformación social, conectando el conocimiento académico con las necesidades de la región.',
    botonTexto: 'Ver convocatorias',
    botonRuta: '/proceso-admision',
    alt: 'Investigadores en laboratorio',
  },
]

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <img
            src={slide.imagen}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/95 via-background/80 to-background/60 lg:from-background/95 lg:via-primary/[0.04] lg:to-background/30" />
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32 w-full">
        <div className="relative mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-opacity duration-1000 ease-in-out ${index === activeIndex
                ? 'opacity-100'
                : 'pointer-events-none absolute inset-x-0 top-0 bottom-0 opacity-0'
                }`}
            >
              <h1 className="font-heading text-4xl font-light uppercase tracking-wide text-foreground sm:text-5xl lg:text-6xl">
                {slide.titulo}
                <span className="mt-3 block font-sans text-base font-light leading-relaxed text-muted-foreground">
                  {slide.subtitulo}
                </span>
              </h1>
              <p className="mt-6 font-sans text-base font-light leading-relaxed text-muted-foreground">
                {slide.descripcion}
              </p>
              <div className="mt-10 flex justify-center gap-4 lg:justify-start">
                <Button asChild size="lg">
                  <Link
                    href={slide.botonRuta}
                    className="font-sans text-sm font-normal uppercase tracking-widest"
                  >
                    {slide.botonTexto}
                    <ArrowRight className="ml-2 h-4 w-4 text-secondary" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex
              ? 'w-6 bg-primary'
              : 'w-2 bg-secondary/50 hover:bg-secondary/80'
              }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
