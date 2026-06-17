import type { Curso } from "./curso"

interface ProgramaRef {
  id: number
  nombre: string
  slug: string
}

export interface ProgramaCurso {
  id: number
  idPrograma: ProgramaRef
  idCurso: Curso
  semestres: string
}
