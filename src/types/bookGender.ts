export const BookGender = {
  Drama: "DRAMA",
  SciencieFiction: "SCIENCE FICTION",
  Romance: "ROMANCE",
  SelfHelp: "SELF HELP",
  Design: "DESIGN",
  ClassicLiterature: "CLASSIC LITERATURE",
}

export type BookGender = (typeof BookGender)[keyof typeof BookGender]
