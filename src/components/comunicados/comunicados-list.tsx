"use client"

import { useState, useMemo } from "react"
import type { Comunicado } from "@/src/types"
import { ComunicadoFilters } from "./comunicado-filters"
import { ComunicadoGrid } from "./comunicado-grid"

interface ComunicadosListProps {
  comunicados: Comunicado[]
}

export function ComunicadosList({ comunicados }: ComunicadosListProps) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return comunicados
    const q = search.toLowerCase()
    return comunicados.filter(
      (c) =>
        c.titulo.toLowerCase().includes(q) ||
        c.resumen.toLowerCase().includes(q),
    )
  }, [comunicados, search])

  return (
    <>
      <ComunicadoGrid comunicados={filtered} />
    </>
  )
}
