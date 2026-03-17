export const UserKind = {
  READER: "Lector",
  PUBLISHER: "Publicador",
  COMBINED: "Lector / Publicador",
}

export type UserKind = (typeof UserKind)[keyof typeof UserKind]
