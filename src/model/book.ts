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
  pages: number
  ISBN: string
  language: Languages
  editorial: string
  publishDate: Date
  condition: BookCondition
  reviews: BookReview[]
  imageSrc: string
  owner: UserProfile

  constructor(
    id: number = 0,
    title: string = "",
    bookType: BookType = BookType.Common,
    desc: string = "",
    gender: BookGender = BookGender.Drama,
    author: Author = new Author(),
    pages: number = 0,
    ISBN: string = "",
    language: Languages = Languages.Spanish,
    editorial: string = "",
    publishDate: Date = new Date(),
    condition: BookCondition = BookCondition.Good,
    reviews: BookReview[] = [],
    imageSrc: string = "",
    owner: UserProfile = new UserProfile(),
  ) {
    this.id = id
    this.title = title
    this.bookType = bookType
    this.desc = desc
    this.gender = gender
    this.author = author
    this.pages = pages
    this.ISBN = ISBN
    this.language = language
    this.editorial = editorial
    this.publishDate = publishDate
    this.condition = condition
    this.reviews = reviews
    this.imageSrc = imageSrc
    this.owner = owner
  }

  calculateBibliokarmas(): number {
    return 0
  }

  ratingAvg(): number {
    if (this.reviews.length == 0) return 0.0
    return this.reviews.reduce((s, r) => s + r.rate, 0) / this.reviews.length
  }

  static fromJSON(bookJSON: BookJSON): Book {
    const book = Object.assign(new Book(), bookJSON, {})
    return book
  }
}
