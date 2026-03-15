import type { BookReview } from "./review"
import { BookType } from "../types/bookType"
import { BookGender } from "../types/bookGender"
import { Languages } from "../types/languages"
import { BookCondition } from "../types/bookCondition"
import { Author } from "./author"
import { UserProfile } from "./userProfile"
import type { BookJSON } from "@/json/bookJSON"

export class Book {
  id: number
  title: string
  bookType: BookType
  desc: string
  gender: BookGender
  author: Author
  numPages: number
  ISBN: string
  language: Languages
  editorial: string
  publishDate: Date
  condition: BookCondition
  imageSrc: string
  owner: UserProfile

  constructor(
    id: number = 0,
    title: string = "",
    bookType: BookType = BookType.Common,
    desc: string = "",
    gender: BookGender = BookGender.DRAMA,
    author: Author = new Author(),
    numPages: number = 0,
    ISBN: string = "",
    language: Languages = Languages.SPANISH,
    editorial: string = "",
    publishDate: Date = new Date(),
    condition: BookCondition = BookCondition.GOOD,
    imageSrc: string = "",
    owner: UserProfile = new UserProfile(),
  ) {
    this.id = id
    this.title = title
    this.bookType = bookType
    this.desc = desc
    this.gender = gender
    this.author = author
    this.numPages = numPages
    this.ISBN = ISBN
    this.language = language
    this.editorial = editorial
    this.publishDate = publishDate
    this.condition = condition
    this.imageSrc = imageSrc
    this.owner = owner
  }

  calculateBibliokarmas(): number {
    return 0
  }

  ratingAvg(): number {
    return 0
  }

  static fromJSON(bookJSON: BookJSON): Book {
    const book = Object.assign(new Book(), bookJSON, {
      publishDate: new Date(bookJSON.publishDate),
    })
    return book
  }
}
