import type { UserKind } from "@/types/userKind"

export type UserProfileJSON = {
  id: number
  name: string
  description: string
  email: string
  cel: string
  location: string
  timestamp: string
  bibliokarmas: number
  userType: UserKind
  img: string
}

export type UserProfileUpdateJSON = {
  id: number
  name: string
  description: string
  email: string
  cel: string
  location: string
  timestamp: string
  bibliokarmas: number
  userType: UserKind
}
