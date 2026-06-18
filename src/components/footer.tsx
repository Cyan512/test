import Link from "next/link"

const footerLinks = [
  {
    title: 'Programas',
    links: [
      { label: 'Maestrías', href: '/maestrias' },
      { label: 'Doctorados', href: '/doctorados' },
      { label: 'Residentado médico', href: '/residentado-medico' },
      { label: 'Segundas especialidades', href: '/segundas-especialidades' },
    ],
  },
  {
    title: 'Información',
    links: [
      { label: 'Comunicados', href: '/comunicados' },
      { label: 'Admisión', href: '/' },
      { label: 'Servicios', href: '/' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-sans text-sm font-medium text-primary-foreground">
                EP
              </div>
              <span className="font-heading text-base font-light tracking-wide">
                Escuela de Posgrado UNSAAC
              </span>
            </Link>
            <p className="mt-3 max-w-xs border-l-2 border-primary/10 pl-4 font-sans text-sm font-light leading-relaxed text-muted-foreground">
              Formando profesionales de excelencia con programas académicos de
              alta calidad en la Universidad Nacional de San Antonio Abad del
              Cusco.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 font-heading text-xs font-light uppercase tracking-widest text-foreground after:block after:w-6 after:h-0.5 after:bg-secondary after:mt-1">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm font-normal text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-primary/10 pt-6 text-center font-sans text-xs font-normal text-muted-foreground">
          &copy; {new Date().getFullYear()} Escuela de Posgrado UNSAAC. Todos
          los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
