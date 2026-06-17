export type Categoria = "OE" | "EE"

export interface Curso {
  id: number
  nombre: string
  creditos: number
  categoria: Categoria
}
