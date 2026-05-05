import type { ProfileBookJSON } from "@/json/bookJSON"

export class BookProfile {
  id: number
  title: string
  authorName: string
  gender: string
  timestamp: Date
  imageSrc: string
  state: string

  constructor(
    id: number = -1,
    title: string = "",
    authorName: string = "",
    gender: string = "",
    timestamp: Date = new Date(),
    imageSrc: string = "",
    state: string = ""
  ) {
  
    this.id = id
    this.title = title
    this.authorName = authorName
    this.gender = gender
    this.timestamp = timestamp
    this.imageSrc = imageSrc
    this.state = state
  }

  static fromJSON(
      bookJSON: ProfileBookJSON,
    ): BookProfile {
      return Object.assign(new BookProfile(), bookJSON, {
        authorName: bookJSON.author,
        timestamp: new Date(bookJSON.timestamp)
      })
    }
}