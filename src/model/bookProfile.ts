
export class ProfileBook {
  id: number
  title: string
  authorName: string
  gender: string
  timestamp: Date
  imageSrc: string

  constructor(
    id: number = -1,
    title: string = "",
    authorName: string = "",
    gender: string = "",
    timestamp: Date = new Date(),
    imageSrc: string = ""
  ) {
  
    this.id = id
    this.title = title
    this.authorName = authorName
    this.gender = gender
    this.timestamp = timestamp
    this.imageSrc = imageSrc
  }
}