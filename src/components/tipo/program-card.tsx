import Link from "next/link"
import type { Programa } from "@/src/types"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

interface ProgramCardProps {
  programa: Programa
}

export function ProgramCard({ programa }: ProgramCardProps) {
  const tipoSlug = programa.idTipoPrograma.slug

  return (
    <Link
      href={`/${tipoSlug}/${programa.slug}`}
    >
      <Card className="group h-full overflow-hidden pt-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-primary/3 to-secondary/3">
          {programa.convocatoria && (
            <Badge className="absolute left-1/2 top-3 z-10 -translate-x-1/2 bg-primary font-sans text-xs uppercase tracking-widest text-primary-foreground">
              En convocatoria
            </Badge>
          )}
        </div>
        <CardHeader>
          <CardTitle className="font-heading text-lg font-light uppercase tracking-wide text-foreground">
            {programa.nombre}
          </CardTitle>
          <CardDescription className="font-sans text-xs uppercase tracking-widest text-muted-foreground/80">
            {programa.idFacultad.nombre}
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t border-border/40 bg-transparent transition-colors duration-300 group-hover:border-primary/30">
          <div className="flex w-full items-center gap-3">
            <span className="h-px flex-1 origin-left scale-x-0 bg-primary/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="flex shrink-0 items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-primary/60 transition-colors duration-300 group-hover:text-primary">
              Ver programa
            </span>
            <span className="h-px flex-1 origin-right scale-x-0 bg-primary/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
