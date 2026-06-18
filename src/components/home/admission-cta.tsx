import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ROUTES } from '@/src/constants/routes'
import { ArrowRight } from 'lucide-react'

export function AdmissionCTA() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-primary-foreground sm:text-4xl">
            ¿Listo para Trascender en tu
            Carrera?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl font-sans text-base font-light leading-relaxed text-primary-foreground/80">
            Únete a la élite académica del Cusco y transforma tu potencial en
            resultados extraordinarios con nuestra formación de prestigio
            internacional.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground font-sans text-sm font-normal uppercase tracking-widest text-primary hover:bg-primary-foreground/90"
            >
              <Link href={ROUTES.PROCESO_ADMISION}>
                Inscribirme ahora
                <ArrowRight className="ml-2 h-4 w-4 text-secondary" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 font-sans text-sm font-normal uppercase tracking-widest text-primary-foreground hover:bg-primary-foreground/10">
              <Link href={ROUTES.COMUNICADOS}>
                Ver comunicados
                <ArrowRight className="ml-2 h-4 w-4 text-secondary" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
