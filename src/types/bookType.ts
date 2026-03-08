export const BookType = {
  Common: "COMUN",
  WithADedication: "CON DEDICATORIA",
  Collectible: "COLECCIONABLE",
}

export type BookType = (typeof BookType)[keyof typeof BookType]
