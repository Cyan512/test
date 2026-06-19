"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"

interface ComunicadoFiltersProps {
  value: string
  onChange: (value: string) => void
}

export function ComunicadoFilters({ value, onChange }: ComunicadoFiltersProps) {
  return (
    <div className="rounded-xl border border-primary/10 bg-card p-4 shadow-sm">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-primary/50" />
          <Input
            placeholder="Buscar comunicado..."
            className="pl-8"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange("")}
            className="size-10 shrink-0"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
