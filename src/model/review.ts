import type { ReviewJSON } from "@/json/ReviewJSON"
import { ValidationMessage } from "../validation/validationMessage"

export class BookReview {
  MAX_CHARACTERS: number = 250

  errors: ValidationMessage[] = []
  id: number
  rate: number
  review: string
  color: string
  userName: string

  constructor(
    id: number = 0,
    rate: number = 0,
    review: string = "",
    color: string = "",
    userName: string = "",
  ) {
    this.id = id
    this.rate = rate
    this.review = review
    this.color = color
    this.userName = userName
  }

  invalidReviewLength(): boolean {
    return this.review.length > this.MAX_CHARACTERS
  }

  addError(field: string, message: string) {
    this.errors.push(new ValidationMessage(field, message))
  }

  validate() {
    this.errors = []

    if (this.invalidReviewLength()) {
      this.addError(
        "book-review-too-long",
        "La reseña debe tener menos de 250 caracteres",
      )
    }
  }

  static fromJSON(bookReviewJSON: ReviewJSON): BookReview {
    return Object.assign(new BookReview(), bookReviewJSON, {})
  }
}
