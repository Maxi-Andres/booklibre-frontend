import { UserKind } from "../types/userKind"
import type { UserProfileJSON } from "@/json/userProfileJSON"

export class UserProfile {
  id: number
  name: string
  description: string
  img: string
  location: string
  timestamp: string
  bibliokarmas: string
  email: string
  cel: string
  userType: UserKind

  constructor(
    id: number = 0,
    name: string = "",
    description: string = "",
    img: string = "",
    location: string = "",
    timestamp: string = "",
    bibliokarmas: string = "",
    email: string = "",
    cel: string = "",
    userType: UserKind = UserKind.READER,
  ) {

    this.id = id
    this.name = name
    this.description = description
    this.img = img
    this.location = location
    this.timestamp = timestamp
    this.bibliokarmas = bibliokarmas
    this.email = email
    this.cel = cel
    this.userType = userType
  }

  static fromJSON(userJSON: UserProfileJSON): UserProfile {
    const profile = Object.assign(new UserProfile(), userJSON, {})
    return profile
  }
}
