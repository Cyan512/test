import Link from "next/link"
import { getComunicados } from "@/src/lib/api"
import { ComunicadoCard } from "@/src/components/comunicados/comunicado-card"
import { ArrowRight } from "lucide-react"

export async function LatestComunicados() {
  const comunicados = await getComunicados()
  const latest = comunicados.slice(0, 3)

  return (
    <section className="border-t border-primary/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-secondary">
              Mantente informado
            </p>
            <h2 className="mt-2 font-heading text-3xl font-light uppercase tracking-wide text-foreground">
              Últimos Comunicados
            </h2>
          </div>
          <Link
            href="/comunicados"
            className="group flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Ver todos
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-center font-sans text-sm text-muted-foreground">
            No hay comunicados disponibles.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((comunicado) => (
              <ComunicadoCard key={comunicado.id} comunicado={comunicado} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
