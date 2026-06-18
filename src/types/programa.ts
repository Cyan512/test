import type { TipoPrograma } from "./tipo-programa"
import type { Facultad } from "./facultad"
import { Modalidad } from "@/src/types/enum/modalidad"

export interface Programa {
  id: number
  idTipoPrograma: TipoPrograma
  nombre: string
  idFacultad: Facultad
  slug: string
  convocatoria: boolean
  modalidad: Modalidad
}
