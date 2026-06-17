import type { ProgramaCurso } from "@/src/types"
import { cn } from "@/src/lib/utils"

interface CourseListProps {
  cursos: ProgramaCurso[]
}

const categoriaStyles: Record<string, string> = {
  OE: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  EE: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
}

export function CourseList({ cursos }: CourseListProps) {
  if (cursos.length === 0) {
    return (
      <p className="text-muted-foreground">
        No hay cursos registrados para este programa.
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Curso</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Categoría</th>
            <th className="text-center px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Créditos</th>
            <th className="text-center px-4 py-3 font-medium text-muted-foreground">Semestre</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((pc) => (
            <tr key={pc.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-medium">{pc.idCurso.nombre}</td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <span
                  className={cn(
                    "inline-block rounded-md px-2 py-0.5 text-xs font-medium",
                    categoriaStyles[pc.idCurso.categoria] ?? "bg-muted text-muted-foreground",
                  )}
                >
                  {pc.idCurso.categoria === "OE" ? "Obligatorio" : "Electivo"}
                </span>
              </td>
              <td className="px-4 py-3 text-center hidden sm:table-cell text-muted-foreground">
                {pc.idCurso.creditos}
              </td>
              <td className="px-4 py-3 text-center text-muted-foreground">
                {pc.semestres}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
