import { type UserType, Reader } from "../types/userType"
import type { UserProfileJSON } from "@/json/userProfileJSON"

export class UserProfile {
  id: number
  name: string
  desc: string
  img: string
  location: string
  timestamp: string
  bibliokarmas: string
  mail: string
  cel: string
  userType: UserType

  constructor(
    id: number = 0,
    name: string = "",
    desc: string = "",
    img: string = "",
    location: string = "",
    timestamp: string = "",
    bibliokarmas: string = "",
    mail: string = "",
    cel: string = "",
    userType: UserType = Reader,

  ) {

    this.id = id
    this.name = name
    this.desc = desc
    this.img = img
    this.location = location
    this.timestamp = timestamp
    this.bibliokarmas = bibliokarmas
    this.mail = mail
    this.cel = cel
    this.userType = userType

  }

  static fromJSON(userJSON: UserProfileJSON): UserProfile {
    const profile = Object.assign(new UserProfile(), userJSON, {})
    return profile
  }
}
