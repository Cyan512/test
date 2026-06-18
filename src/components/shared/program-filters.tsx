"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Button } from "@/src/components/ui/button"
import type { Facultad, Modalidad } from "@/src/types"

const MODALIDADES: { value: Modalidad; label: string }[] = [
  { value: "PRESENCIAL", label: "Presencial" },
  { value: "SEMIPRESENCIAL", label: "Semipresencial" },
  { value: "VIRTUAL", label: "Virtual" },
]

interface ProgramFiltersProps {
  facultades: Facultad[]
}

export function ProgramFilters({ facultades }: ProgramFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const currentQ = searchParams.get("q") ?? ""
  const currentModalidad = searchParams.get("modalidad") ?? ""
  const currentFacultad = searchParams.get("idFacultad") ?? ""
  const currentConvocatoria = searchParams.get("convocatoria") ?? ""

  const [qInput, setQInput] = useState(currentQ)
  const [modalidad, setModalidad] = useState(currentModalidad)
  const [facultad, setFacultad] = useState(currentFacultad)
  const [convocatoria, setConvocatoria] = useState(currentConvocatoria)

  const hasFilters = currentQ || currentModalidad || currentFacultad || currentConvocatoria

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (qInput) params.set("q", qInput)
    if (modalidad) params.set("modalidad", modalidad)
    if (facultad) params.set("idFacultad", facultad)
    if (convocatoria) params.set("convocatoria", convocatoria)
    const qs = params.toString()
    startTransition(() => router.push(`${pathname}${qs ? `?${qs}` : ""}`))
  }

  const clearFilters = () => {
    setQInput("")
    setModalidad("")
    setFacultad("")
    setConvocatoria("")
    startTransition(() => router.push(pathname))
  }

  return (
    <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar programas..."
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              className="pl-8"
            />
          </div>

          <Select value={modalidad} onValueChange={setModalidad}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Modalidad" />
            </SelectTrigger>
            <SelectContent>
              {MODALIDADES.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={facultad} onValueChange={setFacultad}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Facultad" />
            </SelectTrigger>
            <SelectContent>
              {facultades.map((f) => (
                <SelectItem key={f.id} value={String(f.id)}>
                  {f.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={convocatoria} onValueChange={setConvocatoria}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Convocatoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Abierta</SelectItem>
              <SelectItem value="false">Cerrada</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="default" size="sm" onClick={applyFilters}>
            <Search className="size-4" />
            Buscar
          </Button>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="size-4" />
              Limpiar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
