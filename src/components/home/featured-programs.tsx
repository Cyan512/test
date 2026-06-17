import type { Programa } from "@/src/types"
import { ProgramCard } from "@/src/components/shared/program-card"

interface FeaturedProgramsProps {
  programas: Programa[]
}

export function FeaturedPrograms({ programas }: FeaturedProgramsProps) {
  if (programas.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          Programas destacados
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programas.map((programa) => (
            <ProgramCard key={programa.id} programa={programa} />
          ))}
        </div>
      </div>
    </section>
  )
}
