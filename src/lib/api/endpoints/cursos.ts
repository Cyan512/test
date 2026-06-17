import { cache } from "react"
import { apiFetch } from "../client"
import type { Curso } from "@/src/types"

export const getCursos = cache(
  () => apiFetch<Curso[]>("/cursos"),
)
