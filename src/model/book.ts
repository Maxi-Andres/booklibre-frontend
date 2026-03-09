import type { BookReview } from "./bookReview"
import { BookType } from "../types/bookType"
import { BookGender } from "../types/bookGender"
import { Languages } from "../types/languages"
import { BookCondition } from "../types/bookCondition"

export class Book {
  title: string
  bookType: BookType
  desc: string
  gender: BookGender
  author: string
  pages: number
  ISBN: string
  language: Languages
  editorial: string
  publishDate: Date
  condition: BookCondition
  reviews: BookReview[]

  constructor(
    title: string = "",
    bookType: BookType = BookType.Common,
    desc: string = "",
    gender: BookGender = BookGender.Drama,
    author: string = "",
    pages: number = 0,
    ISBN: string = "",
    language: Languages = Languages.Spanish,
    editorial: string = "",
    publishDate: Date = new Date(),
    condition: BookCondition = BookCondition.Good,
    reviews: BookReview[] = [],
  ) {
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
  }
}
