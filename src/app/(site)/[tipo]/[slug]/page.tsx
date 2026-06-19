import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProgramaBySlug, getProgramasCursos } from "@/src/lib/api"
import { PageHero } from "@/src/components/tipo/page-hero"
import { ProgramActions } from "@/src/components/tipo/program-actions"
import { CourseList } from "@/src/components/shared/course-list"
import type { Programa } from "@/src/types"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { MallaCurricularTab } from "@/src/components/tipo/slug/malla-curricular-tab"
import { PresentacionTab } from "@/src/components/tipo/slug/presentacion-tab"
import { LineasInvestigacionTab } from "@/src/components/tipo/slug/lineas-investigacion-tab"

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
  console.log(programa)
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

            <ProgramActions />
          </aside>
          <main className="lg:col-span-9 lg:pl-8 border-t lg:border-t-0 lg:border-l border-primary/10 pt-8 lg:pt-0">
            <div className="hidden md:block">
              <Tabs defaultValue="presentacion" className="w-full gap-8">
                <TabsList className="flex border-b border-primary/10 w-full bg-transparent p-0 gap-0 rounded-none">
                  <TabsTrigger value="presentacion" className='group-data-[variant=default]/tabs-list:data-active:shadow-none'>Presentación</TabsTrigger>
                  <TabsTrigger value="malla" className='group-data-[variant=default]/tabs-list:data-active:shadow-none'>Malla Curricular</TabsTrigger>
                  <TabsTrigger value="inversion" className='group-data-[variant=default]/tabs-list:data-active:shadow-none'>Inversión y Becas</TabsTrigger>
                  <TabsTrigger value="lineas" className='group-data-[variant=default]/tabs-list:data-active:shadow-none'>Líneas de Investigación</TabsTrigger>
                </TabsList>

                <TabsContent value="presentacion">
                  <PresentacionTab objetivoGeneral={programa.objetivoGeneral} objetivosEspecificos={programa.objetivosEspecificos} />
                </TabsContent>

                <TabsContent value="malla">
                  {cursos && <MallaCurricularTab perfilPosgraduado={programa.perfilPosgraduado} cursos={cursos} />}
                </TabsContent>

                <TabsContent value="inversion">
                  {cursos && <MallaCurricularTab cursos={cursos} perfilPosgraduado={programa.perfilPosgraduado} />}
                </TabsContent>

                <TabsContent value="lineas">
                  <LineasInvestigacionTab programa={programa.lineasInvestigacion}/>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
