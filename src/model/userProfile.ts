import { Book } from "./book"
import { type UserType, Reader } from "../types/userType"

export class UserProfile {
  name: string
  desc: string
  location: string
  timestamp: string
  bibliokarmas: string
  mail: string
  cel: string
  userType: UserType
  ownBooks: Book[]
  readBooks: number

  constructor(
    name: string = "",
    desc: string = "",
    location: string = "",
    timestamp: string = "",
    bibliokarmas: string = "",
    mail: string = "",
    cel: string = "",
    userType: UserType = Reader,
    ownBooks: Book[] = [],
    readBooks: number = 0,
  ) {
    this.name = name
    this.desc = desc
    this.location = location
    this.timestamp = timestamp
    this.bibliokarmas = bibliokarmas
    this.mail = mail
    this.cel = cel
    this.userType = userType
    this.ownBooks = ownBooks
    this.readBooks = readBooks
  }
}
