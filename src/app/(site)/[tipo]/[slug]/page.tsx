import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProgramaBySlug, getProgramasCursos } from "@/src/lib/api"
import { PageHero } from "@/src/components/tipo/page-hero"
import { CourseList } from "@/src/components/shared/course-list"
import type { Programa } from "@/src/types"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Printer, Share2 } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const programa = await getProgramaBySlug(slug)
    return {
      title: programa.nombre,
      description: `${programa.nombre} - ${programa.modalidad} - ${programa.idFacultad.nombre}`,
    }
  } catch {
    return { title: "Programa no encontrado" }
  }
}

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let programa: Programa
  try {
    programa = await getProgramaBySlug(slug)
  } catch {
    notFound()
  }

  const cursos = await getProgramasCursos({ programaId: programa.id })

  return (
    <>
      <PageHero
        image={"/bg/bg-programa.png"}
        title={programa.nombre}
        description={programa.idFacultad.nombre}
      />
      <div className="w-full border-b border-border/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 h-fit">
            <Button variant="ghost" asChild className="group -ml-4 rounded-none hover:bg-transparent text-muted-foreground hover:text-foreground">
              <Link href={`/${programa.idTipoPrograma.nombre}`} className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                  Volver a programas
                </span>
              </Link>
            </Button>

            <div className="h-px bg-primary/10" />

            <div className="flex flex-col gap-3 pt-2">
              <button className="flex items-center gap-2 text-left font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group">
                <Share2 className="h-4 w-4 transition-colors group-hover:text-secondary" /> Compartir programa
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 text-left font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group">
                <Printer className="h-4 w-4 transition-colors group-hover:text-secondary" /> Imprimir programa
              </button>
            </div>
          </aside>
        </div>
      </div>
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Plan de estudios</h2>
              <CourseList cursos={cursos} />
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Información del programa</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Modalidad</dt>
                  <dd className="font-medium">{programa.modalidad}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Facultad</dt>
                  <dd className="font-medium">{programa.idFacultad.nombre}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Convocatoria</dt>
                  <dd className="font-medium">
                    {programa.convocatoria ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Abierta</span>
                    ) : (
                      <span className="text-muted-foreground">Cerrada</span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tipo</dt>
                  <dd className="font-medium">{programa.idTipoPrograma.nombre}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
