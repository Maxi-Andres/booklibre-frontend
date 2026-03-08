export interface UserType {
  type: string
}

export const Reader: UserType = {
  type: "Lector",
}

export const Publisher: UserType = {
  type: "Publicador",
}

export const ReaderPublisher: UserType = {
  type: "Lector / Publicador",
}
