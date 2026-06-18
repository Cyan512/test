import type { Programa } from "@/src/types"
import { ProgramCard } from "@/src/components/tipo/program-card"
import { SearchX } from "lucide-react"

interface ProgramGridProps {
  programas: Programa[]
}

export function ProgramGrid({ programas }: ProgramGridProps) {
  if (programas.length === 0) {
    return (
      <div className="mt-12 text-center">
        <SearchX className="mx-auto mb-4 h-12 w-12" />
        <p className="text-base font-light leading-relaxed ">
          No se encontraron programas con los filtros seleccionados.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programas.map((programa) => (
        <ProgramCard key={programa.id} programa={programa} />
      ))}
    </div>
  )
}
