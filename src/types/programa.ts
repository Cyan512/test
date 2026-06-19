import type { TipoPrograma } from "./tipo-programa"
import type { Facultad } from "./facultad"
import { Modalidad } from "@/src/types/enum/modalidad"

export interface Programa {
  id: number
  nombre: string
  slug: string
  imagen: string
  convocatoria: boolean
  objetivoGeneral: string
  objetivosEspecificos: string
  perfilPosgraduado: string
  idFacultad: Facultad
  idTipoPrograma: TipoPrograma
  modalidad: Modalidad
  lineasInvestigacion: string
}
