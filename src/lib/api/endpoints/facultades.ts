import { cache } from "react"
import { apiFetch } from "../client"
import type { Facultad } from "@/src/types"

export const getFacultades = cache(
  () => apiFetch<Facultad[]>("/facultades"),
)
