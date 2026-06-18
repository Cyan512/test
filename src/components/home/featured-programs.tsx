import type { TipoPrograma } from "@/src/types"
import Link from "next/link"

interface FeaturedProgramsProps {
  programas: TipoPrograma[]
}

export function FeaturedPrograms({ programas }: FeaturedProgramsProps) {
  console.log("asd", programas)
  if (programas.length === 0) return null

  return (
    <section className="border-y border-primary/10 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl">
            Programas Destacados
          </h2>
          <p className="mt-3 font-sans text-base font-light leading-relaxed text-muted-foreground">
            Explora nuestra oferta académica de posgrado y encuentra el
            programa ideal para tu desarrollo profesional.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:flex sm:h-112.5 sm:flex-row sm:items-stretch sm:gap-2">
          {programas.map((program) => (
            <Link
              key={program.nombre}
              href={`/${program.slug}`}
              className="group relative aspect-3/4 overflow-hidden rounded-xl transition-all delay-75 duration-700 ease-in-out sm:aspect-auto sm:flex-1 sm:hover:flex-3"
            >
              <img
                src={program.imagenCard || "/bg/image/bg-programa.png"}
                alt={program.nombre}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-transparent" />

              <div className="relative flex h-full w-full flex-col items-start justify-end p-4 sm:p-6">
                <h3 className="font-heading text-sm font-light uppercase tracking-wide text-primary-foreground transition-all delay-75 duration-700 ease-in-out sm:[writing-mode:vertical-lr] sm:group-hover:[writing-mode:horizontal-tb] sm:text-xl sm:group-hover:text-2xl">
                  {program.nombre}
                </h3>

                <p className="mt-1 font-sans text-xs font-light text-primary-foreground/80 sm:mt-2 sm:text-sm sm:opacity-0 sm:group-hover:opacity-100 sm:transition-all sm:delay-75 sm:duration-700 sm:ease-in-out">
                  1 programas disponibles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
