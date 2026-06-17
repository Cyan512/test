import { cache } from "react"
import { apiFetch } from "../client"
import type { ProgramaCurso } from "@/src/types"

export interface ProgramasCursosFilters {
  programaId?: number
  cursoId?: number
}

export const getProgramasCursos = cache(
  async (filters?: ProgramasCursosFilters) => {
    const params = new URLSearchParams()
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          params.set(key, String(value))
        }
      }
    }
    const qs = params.toString()
    return apiFetch<ProgramaCurso[]>(`/programas-cursos${qs ? `?${qs}` : ""}`)
  },
)
