import { Categoria } from "@/src/types/enum/categoria"

export interface Curso {
  id: number
  nombre: string
  creditos: number
  categoria: Categoria
}
