export const BookType = {
  Common: "COMUN",
  WithADedication: "CON DEDICATORIA", 
  Collectible: "COLECCIONABLE",
}

export const BookTypeLabels: Record<BookType, string> = {
  [BookType.Common]: "Común",
  [BookType.WithADedication]: "Con dedicatoria",
  [BookType.Collectible]: "Coleccionable",
}

export type BookType = (typeof BookType)[keyof typeof BookType]
