export const BookGender = {
  Drama: "Drama",
  SciencieFiction: "Ciencia Ficción",
  Romance: "Romance",
  SelfHelp: "Autoayuda",
  Design: "Diseño",
  ClassicLiterature: "Literatura Clásica",
}

export type BookGender = (typeof BookGender)[keyof typeof BookGender]
