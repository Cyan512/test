import type { Programa } from "@/src/types"
import { ProgramCard } from "./program-card"

interface ProgramGridProps {
  programas: Programa[]
}

export function ProgramGrid({ programas }: ProgramGridProps) {
  if (programas.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No hay programas disponibles en esta categoría.
      </p>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programas.map((programa) => (
        <ProgramCard key={programa.id} programa={programa} />
      ))}
    </div>
  )
}
