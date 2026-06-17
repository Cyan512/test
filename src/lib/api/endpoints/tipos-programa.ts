import { cache } from "react"
import { apiFetch } from "../client"
import type { TipoPrograma } from "@/src/types"

export const getTiposPrograma = cache(
  () => apiFetch<TipoPrograma[]>("/tipos-programa"),
)

export const getTipoProgramaBySlug = cache(
  (slug: string) => apiFetch<TipoPrograma>(`/tipos-programa/${slug}`),
)
