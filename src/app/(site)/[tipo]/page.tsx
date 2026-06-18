import { notFound } from "next/navigation"
import { getTipoProgramaBySlug, getProgramas, getFacultades } from "@/src/lib/api"
import { PageHero } from "@/src/components/tipo/page-hero"
import { ProgramGrid } from "@/src/components/tipo/program-grid"
import { ProgramFilters } from "@/src/components/tipo/program-filters"
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
        image={tipoPrograma.imagenBg || "/bg/bg-programa.png"}
        subtitle={`Explora nuestros programas de ${tipoPrograma.nombre.toLowerCase()} y encuentra el que mejor se adapte a tus objetivos profesionales.`}
      />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <ProgramFilters facultades={facultades} />
        <p className="mt-6"></p>
        <ProgramGrid programas={programas} />
      </div>
    </>
  )
}