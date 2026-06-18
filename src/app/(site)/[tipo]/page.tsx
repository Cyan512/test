  import { notFound } from "next/navigation"
  import { getTipoProgramaBySlug, getProgramas, getFacultades } from "@/src/lib/api"
  import { PageHero } from "@/src/components/shared/page-hero"
  import { ProgramGrid } from "@/src/components/shared/program-grid"
  import { ProgramFilters } from "@/src/components/shared/program-filters"
  import type { TipoPrograma } from "@/src/types"

  interface ProgramListProps {
    params: Promise<{ tipo: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }

  export default async function ProgramList({
    params,
    searchParams,
  }: ProgramListProps) {
    const { tipo } = await params
    const filters = await searchParams

    console.log("Search Params:", filters) // Debugging line


    const q = typeof filters.q === "string" ? filters.q : undefined
    const modalidad = typeof filters.modalidad === "string" ? filters.modalidad : undefined
    const idFacultad = typeof filters.idFacultad === "string" ? Number(filters.idFacultad) : undefined
    const convocatoria = typeof filters.convocatoria === "string" ? filters.convocatoria === "true" : undefined

    let tipoPrograma: TipoPrograma

    try {
      tipoPrograma = await getTipoProgramaBySlug(tipo)
    } catch {
      notFound()
    }

    const [programas, facultades] = await Promise.all([
      getProgramas({ tipoSlug: tipo, q, modalidad, idFacultad, convocatoria }),
      getFacultades(),
    ])

    return (
      <>
        <PageHero
          title={tipoPrograma.nombre}
          description={`Explora todos los programas de ${tipoPrograma.nombre.toLowerCase()}`}
        />
        <ProgramFilters facultades={facultades} />
        <section className="container mx-auto px-4 py-12">
          <ProgramGrid programas={programas} />
        </section>
      </>
    )
  }