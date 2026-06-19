import { Categoria } from "@/src/types/enum/categoria"

export type { Categoria }

export interface Curso {
  id: number
  nombre: string
  creditos: number
  categoria: Categoria
}
