"use client"

import { Printer, Share2 } from "lucide-react"

export function ProgramActions() {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: document.title,
              url: window.location.href,
            })
          }
        }}
        className="flex items-center gap-2 text-left font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
      >
        <Share2 className="h-4 w-4 transition-colors group-hover:text-secondary" /> Compartir
        programa
      </button>
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 text-left font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
      >
        <Printer className="h-4 w-4 transition-colors group-hover:text-secondary" /> Imprimir
        programa
      </button>
    </div>
  )
}
