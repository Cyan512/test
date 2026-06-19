import type { Comunicado } from "@/src/types"
import { ComunicadoCard } from "./comunicado-card"
import { Inbox } from "lucide-react"

interface ComunicadoGridProps {
  comunicados: Comunicado[]
}

export function ComunicadoGrid({ comunicados }: ComunicadoGridProps) {
  if (comunicados.length === 0) {
    return (
      <div className="mt-12 text-center">
        <Inbox className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-base font-light leading-relaxed text-muted-foreground">
          No se encontraron comunicados.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {comunicados.map((comunicado) => (
        <ComunicadoCard key={comunicado.id} comunicado={comunicado} />
      ))}
    </div>
  )
}
