import { notFound } from "next/navigation"
import { getTipoProgramaBySlug, getProgramas } from "@/src/lib/api"
import { PageHero } from "@/src/components/shared/page-hero"
import { ProgramGrid } from "@/src/components/shared/program-grid"
import type { TipoPrograma } from "@/src/types"

interface ProgramListProps {
  params: Promise<{
    tipo: string
  }>
}

export default async function ProgramList({
  params,
}: ProgramListProps) {
  const { tipo } = await params

  let tipoPrograma: TipoPrograma
  
  try {
    tipoPrograma = await getTipoProgramaBySlug(tipo)
  } catch {
    notFound()
  }

  const programas = await getProgramas({ tipoSlug: tipo })

  return (
    <>
      <PageHero
        title={tipoPrograma.nombre}
        description={`Explora todos los programas de ${tipoPrograma.nombre.toLowerCase()}`}
      />
      <section className="container mx-auto px-4 py-12">
        <ProgramGrid programas={programas} />
      </section>
    </>
  )
}