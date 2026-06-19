import Link from "next/link"
import type { Comunicado } from "@/src/types"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Calendar } from "lucide-react"

interface ComunicadoCardProps {
  comunicado: Comunicado
}

export function ComunicadoCard({ comunicado }: ComunicadoCardProps) {
  const fecha = new Date(comunicado.fechaPublicacion).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/comunicados/${comunicado.slug}`}>
      <Card className="group h-full overflow-hidden pt-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-primary/3 to-secondary/3">
          {comunicado.imagen ? (
            <img
              src={comunicado.imagen}
              alt={comunicado.titulo}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-heading text-4xl font-light text-muted-foreground/20">EP</span>
            </div>
          )}
          <Badge className="absolute left-1/2 top-3 z-10 -translate-x-1/2 bg-primary/80 font-sans text-xs uppercase tracking-widest text-primary-foreground backdrop-blur-xs">
            <Calendar className="mr-1.5 h-3 w-3" />
            {fecha}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="font-heading text-lg font-light uppercase tracking-wide text-foreground">
            {comunicado.titulo}
          </CardTitle>
          <CardDescription className="line-clamp-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
            {comunicado.resumen}
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t border-border/40 bg-transparent transition-colors duration-300 group-hover:border-primary/30">
          <div className="flex w-full items-center gap-3">
            <span className="h-px flex-1 origin-left scale-x-0 bg-primary/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="flex shrink-0 items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-primary/60 transition-colors duration-300 group-hover:text-primary">
              Leer comunicado
            </span>
            <span className="h-px flex-1 origin-right scale-x-0 bg-primary/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
