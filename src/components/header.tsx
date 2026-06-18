'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import Link from 'next/link'

const PANEL_IMG = 'https://res.cloudinary.com/ds0tjwccs/image/upload/v1779898731/large_Whats_App_Image_2024_01_24_at_10_38_22_AM_13_1_p3eu3c_569c0d75fb.png'

const panel1Links = [
  { num: '01', label: 'Inicio', href: '/' },
  { num: '02', label: 'Maestrías', href: '/maestrias' },
  { num: '03', label: 'Doctorados', href: '/doctorados' },
]

const panel2Links = [
  { num: '04', label: 'Admisión', href: '/proceso-admision' },
  { num: '05', label: 'Comunicados', href: '/comunicados' },
]

function NavLink({
  num,
  label,
  href,
  onClick,
}: {
  num: string
  label: string
  href: string
  onClick: () => void
}) {
  return (
    <li className="border-b border-primary-foreground/10">
      <Link
        href={href}
        onClick={onClick}
        className="group flex items-center justify-between py-3 transition-all duration-200 hover:pl-1.5"
      >
        <div className="flex items-center gap-3">
          <span className="min-w-[20px] font-sans text-xs text-primary-foreground/30">
            {num}
          </span>
          <span className="font-heading text-lg font-light leading-none text-primary-foreground transition-colors group-hover:text-primary-foreground/40">
            {label}
          </span>
        </div>
        <span className="-translate-x-1.5 text-sm text-primary-foreground/20 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          →
        </span>
      </Link>
    </li>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="flex items-center"
        >
          {open ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
        </button>

        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center border border-primary font-sans text-xs font-light tracking-widest text-primary">
            EP
          </div>
          <div>
            <p className="font-heading text-sm font-light leading-tight">
              Posgrado UNSAAC
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              UNSAAC <span className="text-secondary">·</span> Cusco, Perú
            </p>
          </div>
        </Link>

        <button
          aria-label="Buscar"
          className="flex items-center"
        >
          <Search className="h-5 w-5 text-primary" />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 grid grid-cols-1 transition-opacity duration-500 md:grid-cols-3 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div
          className={`relative flex flex-col justify-end overflow-hidden bg-primary px-4 pb-8 pt-20 transition-transform duration-[550ms] ease-[cubic-bezier(0.77,0,0.18,1)] sm:px-6 md:px-8 ${open ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <img
            src={PANEL_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/85 to-primary/75" />
          <div className="relative z-10">
          <div className="mb-8">
            <p className="mb-2 font-sans text-xs uppercase tracking-widest text-primary-foreground/30">
              Universidad Nacional de San Antonio Abad del Cusco
            </p>
            <h2 className="font-heading text-4xl font-light italic leading-tight tracking-wide text-primary-foreground">
              Escuela de
              <br />
              <span className="not-italic">Posgrado</span>
            </h2>
          </div>

          <div className="h-px bg-primary-foreground/10" />

          <ul>
            {panel1Links.map((link) => (
              <NavLink key={link.href} {...link} onClick={close} />
            ))}
            {panel2Links.map((link) => (
              <li key={link.href} className="border-b border-primary-foreground/10 md:hidden">
                <Link
                  href={link.href}
                  onClick={close}
                  className="group flex items-center justify-between py-3 transition-all duration-200 hover:pl-1.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="min-w-[20px] font-sans text-xs text-primary-foreground/30">
                      {link.num}
                    </span>
                    <span className="font-heading text-lg font-light leading-none text-primary-foreground transition-colors group-hover:text-primary-foreground/40">
                      {link.label}
                    </span>
                  </div>
                  <span className="-translate-x-1.5 text-sm text-primary-foreground/20 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/proceso-admision"
            onClick={close}
            className="mt-4 flex w-full items-center justify-between bg-primary-foreground px-4 py-3.5 font-sans text-xs uppercase tracking-widest text-primary transition-colors md:hidden"
          >
            <span>Proceso de Admisión</span>
            <span className="text-secondary">→</span>
          </Link>

          <p className="mt-6 hidden font-sans text-xs text-primary-foreground/20 md:block">
            UNSAAC · 2026
          </p>
          </div>
        </div>

        <div
          className={`relative hidden flex-col justify-end overflow-hidden bg-primary px-8 pb-8 pt-20 transition-transform duration-[550ms] ease-[cubic-bezier(0.77,0,0.18,1)] delay-[60ms] md:flex ${open ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <img
            src={PANEL_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/70 to-primary/55" />
          <div className="relative z-10">
          <div className="mb-8">
            <p className="mb-2 font-sans text-xs uppercase tracking-widest text-primary-foreground/30">
              Formación académica
            </p>
            <h2 className="font-heading text-4xl font-light leading-tight tracking-wide text-primary-foreground">
              Programas
              <br />
              <span className="italic">&amp; Admisión</span>
            </h2>
          </div>
          <div className="h-px bg-secondary/20" />
          <ul>
            {panel2Links.map((link) => (
              <NavLink key={link.href} {...link} onClick={close} />
            ))}
          </ul>
          </div>
        </div>

        <div
          className={`relative hidden flex-col justify-end overflow-hidden bg-primary px-8 pb-8 pt-20 transition-transform duration-[550ms] ease-[cubic-bezier(0.77,0,0.18,1)] delay-[120ms] md:flex ${open ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <img
            src={PANEL_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/55 to-primary/35" />
          <div className="relative z-10">
          <div className="mb-6 space-y-4">
            <div>
              <p className="mb-1 font-sans text-xs uppercase tracking-widest text-primary-foreground/60">
                Correo
              </p>
              <p className="font-sans text-sm font-light text-primary-foreground/85">
                posgrado@unsaac.edu.pe
              </p>
            </div>
            <div className="h-px bg-primary-foreground/10" />
            <div>
              <p className="mb-1 font-sans text-xs uppercase tracking-widest text-primary-foreground/60">
                Teléfono
              </p>
              <p className="font-sans text-sm font-light text-primary-foreground/85">
                +51 84 227841
              </p>
            </div>
            <div className="h-px bg-primary-foreground/10" />
            <div>
              <p className="mb-1 font-sans text-xs uppercase tracking-widest text-primary-foreground/60">
                Dirección
              </p>
              <p className="font-sans text-sm font-light leading-relaxed text-primary-foreground/85">
                Av. de la Cultura s/n
                <br />
                Cusco, Perú
              </p>
            </div>
          </div>
          <div className="h-px bg-primary-foreground/10" />
          <Link
            href="/proceso-admision"
            onClick={close}
            className="mt-4 flex w-full items-center justify-between bg-primary-foreground/15 px-4 py-3.5 font-sans text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-foreground/25"
          >
            <span>Proceso de Admisión</span>
            <span className="text-secondary">→</span>
          </Link>
          </div>
        </div>
      </div>
    </>
  )
}
