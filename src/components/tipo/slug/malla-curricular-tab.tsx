import type { ProgramaCurso } from "@/src/types"

interface MallaCurricularTabProps {
  cursos: ProgramaCurso[]
  perfilPosgraduado: string
}

const romanMap: Record<string, number> = {
  I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6,
  VII: 7, VIII: 8, IX: 9, X: 10,
};

function parseSemestre(sem: string): number {
  const trimmed = sem.trim()
  if (romanMap[trimmed]) return romanMap[trimmed]
  const num = parseInt(trimmed, 10)
  if (!isNaN(num)) return num
  return Infinity
}

export function MallaCurricularTab({ cursos, perfilPosgraduado }: MallaCurricularTabProps) {
  const grouped: Record<string, ProgramaCurso[]> = {}
  cursos.forEach((c) => {
    const sem = c.semestres
    if (!grouped[sem]) grouped[sem] = []
    grouped[sem].push(c)
  })
  const semestres = Object.keys(grouped).sort((a, b) => parseSemestre(a) - parseSemestre(b))

  if (semestres.length === 0) {
    return <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">Información de malla curricular no disponible.</p>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {perfilPosgraduado && (
        <section className="group">
          <div className="mb-4 pb-2 border-b-2 border-primary/20">
            <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl after:block after:w-8 after:h-0.5 after:bg-secondary after:mt-1">
              Perfil del Graduado
            </h2>
          </div>
          <div className="bg-linear-to-r from-secondary/5 to-transparent border-l-2 border-secondary pl-6 py-4">
            <p className="font-sans text-base font-light leading-relaxed text-muted-foreground">
              {perfilPosgraduado}
            </p>
          </div>
        </section>
      )}
      {semestres.map((sem) => (
        <section key={sem} className="group">
          <div className="mb-4 pb-2 border-b-2 border-primary/20">
            <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl after:block after:w-8 after:h-0.5 after:bg-secondary after:mt-1">
              {sem} Semestre
            </h2>
          </div>
          <div className="overflow-x-auto border border-primary/10">
            <table className="w-full">
              <thead className="border-b border-border bg-primary/5">
                <tr>
                  <th className="px-6 py-2 font-sans text-xs uppercase tracking-widest text-primary text-left">
                    Nro.
                  </th>
                  <th className="px-6 py-2 font-sans text-xs uppercase tracking-widest text-primary text-left">
                    Asignatura
                  </th>
                  <th className="px-6 py-2 font-sans text-xs uppercase tracking-widest text-primary text-left">
                    Créditos
                  </th>
                  <th className="px-6 py-2 font-sans text-xs uppercase tracking-widest text-primary text-left">
                    Categoría
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {grouped[sem].map((curso, i) => (
                  <tr key={i} className="transition-colors duration-150 hover:bg-primary/5 border-b-0">
                    <td className="px-6 py-4 font-sans text-sm font-light text-muted-foreground">
                      {String(i + 1)}
                    </td>
                    <td className="px-6 py-4 font-sans text-sm font-light text-muted-foreground">
                      {curso.idCurso.nombre}
                    </td>
                    <td className="px-6 py-4 font-sans text-sm font-light text-muted-foreground">
                      {curso.idCurso.creditos}
                    </td>
                      <td className={`px-6 py-4 font-sans text-sm font-light ${curso.idCurso.categoria === 'OE' ? 'text-primary' : 'text-secondary'}`}>
                        {curso.idCurso.categoria}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
