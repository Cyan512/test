import { getComunicados } from "@/src/lib/api"
import { PageHero } from "@/src/components/tipo/page-hero"
import { ComunicadosList } from "@/src/components/comunicados/comunicados-list"

export default async function Comunicados() {
  const comunicados = await getComunicados()

  return (
    <>
      <PageHero
        title="Comunicados"
        subtitle="Mantente informado sobre las últimas noticias, convocatorias y anuncios de la Escuela de Posgrado."
        image="/bg/bg-programa.png"
      />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <ComunicadosList comunicados={comunicados} />
      </div>
    </>
  )
}
