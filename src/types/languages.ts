export const Languages = {
  Spanish: "ESPAÑOL",
  English: "INGLES",
  French: "FRANCES",
  Portuguese: "PORTUGUES",
}

export type Languages = (typeof Languages)[keyof typeof Languages]
