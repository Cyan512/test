import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getComunicadoBySlug } from "@/src/lib/api"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import type { Comunicado } from "@/src/types"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const comunicado = await getComunicadoBySlug(slug)
    return {
      title: comunicado.titulo,
      description: comunicado.resumen,
    }
  } catch {
    return { title: "Comunicado no encontrado" }
  }
}

export default async function ComunicadoDetalle({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let comunicado: Comunicado
  try {
    comunicado = await getComunicadoBySlug(slug)
  } catch {
    notFound()
  }

  const fecha = new Date(comunicado.fechaPublicacion).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <section className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden border-b border-primary/10 py-24 sm:py-32">
        <img
          src="/bg/bg-programa.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/80 to-background/60 lg:from-background/95 lg:via-primary/4 lg:to-background/30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <Badge className="mb-4 inline-flex bg-primary/10 font-sans text-xs uppercase tracking-widest text-primary">
              <Calendar className="mr-1.5 h-3.5 w-3.5" />
              {fecha}
            </Badge>
            <h1 className="font-heading text-4xl font-light uppercase tracking-wide text-foreground sm:text-5xl">
              {comunicado.titulo}
            </h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
            <Button variant="ghost" asChild className="group -ml-4 rounded-none hover:bg-transparent text-muted-foreground hover:text-foreground">
              <Link href="/comunicados" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                  Volver a comunicados
                </span>
              </Link>
            </Button>
          </aside>
          <main className="lg:col-span-9 lg:pl-8 border-t lg:border-t-0 lg:border-l border-primary/10 pt-8 lg:pt-0 space-y-8">
            <article className="space-y-8">
              <p className="font-heading text-xl font-light leading-relaxed text-muted-foreground">
                {comunicado.resumen}
              </p>
              {comunicado.imagen && (
                <div className="overflow-hidden rounded-xl border border-border/40">
                  <img
                    src={comunicado.imagen}
                    alt={comunicado.titulo}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="whitespace-pre-line font-sans text-base font-light leading-relaxed text-foreground">
                {comunicado.contenido}
              </div>
            </article>
          </main>
        </div>
      </div>
    </>
  )
}
