export const BookType = {
  Common: "common",
  WithADedication: "with-a-dedication",
  Collectible: "collectible",
}

export type BookType = (typeof BookType)[keyof typeof BookType]
