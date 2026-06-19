import { cache } from "react"
import { apiFetch } from "../client"
import type { Comunicado } from "@/src/types"

export const getComunicados = cache(
  async () => apiFetch<Comunicado[]>("/comunicados"),
)

export const getComunicadoBySlug = cache(
  (slug: string) => apiFetch<Comunicado>(`/comunicados/${slug}`),
)
