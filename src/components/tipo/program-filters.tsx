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
    <div className="rounded-xl border border-primary/10 bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-primary/50" />
          <Input
            placeholder="Buscar programa..."
            className="pl-8"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>

        <Select value={facultad} onValueChange={setFacultad}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Facultad" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            className="w-(--radix-select-trigger-width)"
          >
            {facultades.map((f) => (
              <SelectItem key={f.id} value={String(f.id)}>
                {f.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={modalidad} onValueChange={setModalidad}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Modalidad" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            className="w-(--radix-select-trigger-width)">
            {MODALIDADES.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


        <Select value={convocatoria} onValueChange={setConvocatoria}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Convocatoria" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            className="w-(--radix-select-trigger-width)">
            <SelectItem value="true">Abierta</SelectItem>
            <SelectItem value="false">Cerrada</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1 font-sans text-sm font-normal uppercase tracking-widest">
            <Search />
            Buscar
          </Button>

          <Button
            variant="ghost"
            size="icon" onClick={clearFilters} className="size-8 shrink-0">
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
