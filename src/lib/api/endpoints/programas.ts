import { cache } from "react"
import { apiFetch } from "../client"
import type { Programa } from "@/src/types"

export interface ProgramasFilters {
  tipoSlug?: string
  q?: string
  modalidad?: string
  idFacultad?: number
  convocatoria?: boolean
}

export const getProgramas = cache(
  async (filters?: ProgramasFilters) => {
    const params = new URLSearchParams()
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          params.set(key, String(value))
        }
      }
    }
    const qs = params.toString()
    return apiFetch<Programa[]>(`/programas${qs ? `?${qs}` : ""}`)
  },
)

export const getProgramaBySlug = cache(
  (slug: string) => apiFetch<Programa>(`/programas/${slug}`),
)
