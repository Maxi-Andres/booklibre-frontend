import type { UserType } from "@/types/userType"

export type UserProfileJSON = {
  id: number
  name: string
  description: string
  email: string
  cel: string
  location: string
  timestamp: string
  bibliokarmas: number
  userType: UserType
}
