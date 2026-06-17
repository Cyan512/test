import Link from "next/link"
import type { Programa } from "@/src/types"
import { cn } from "@/src/lib/utils"

interface ProgramCardProps {
  programa: Programa
}

const modalidadStyles: Record<string, string> = {
  PRESENCIAL: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  SEMIPRESENCIAL: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  VIRTUAL: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
}

export function ProgramCard({ programa }: ProgramCardProps) {
  const tipoSlug = programa.idTipoPrograma.slug

  return (
    <Link
      href={`/${tipoSlug}/${programa.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {programa.nombre}
          </h3>
          <p className="text-sm text-muted-foreground">
            {programa.idFacultad.nombre}
          </p>
        </div>
        {programa.convocatoria && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            Convocatoria abierta
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={cn(
            "inline-block rounded-md px-2 py-0.5 text-xs font-medium",
            modalidadStyles[programa.modalidad] ?? "bg-muted text-muted-foreground",
          )}
        >
          {programa.modalidad}
        </span>
      </div>
    </Link>
  )
}
