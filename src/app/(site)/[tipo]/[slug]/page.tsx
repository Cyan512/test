import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProgramaBySlug, getProgramasCursos } from "@/src/lib/api"
import { PageHero } from "@/src/components/shared/page-hero"
import { CourseList } from "@/src/components/shared/course-list"
import type { Programa } from "@/src/types"

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
        title={programa.nombre}
        description={programa.idFacultad.nombre}
      />
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
