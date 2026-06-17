import type { TipoPrograma } from "./tipo-programa"
import type { Facultad } from "./facultad"

export type Modalidad = "PRESENCIAL" | "SEMIPRESENCIAL" | "VIRTUAL"

export interface Programa {
  id: number
  idTipoPrograma: TipoPrograma
  nombre: string
  idFacultad: Facultad
  slug: string
  convocatoria: boolean
  modalidad: Modalidad
}
