import { ValidationMessage } from "../ValidationField/validationMessage"
import { type BookReviewJSON } from "../json/bookReviewJSON"

export class BookReview {
  MAX_CHARACTERS: number = 250

  errors: ValidationMessage[] = []
  rate: number
  review: string
  color: string
  userName : string
  // reviewerId: number

  constructor(
    rate: number = 0, 
    review: string = "",
    color: string = "",
    userName: string = "",
    // reviewerId: number = 0
  ) {
    this.rate = rate
    this.review = review
    this.color = color
    this.userName = userName
    // this.reviewerId = reviewerId    
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

  static fromJSON(bookReviewJSON: BookReviewJSON): BookReview {
    return Object.assign(new BookReview(), bookReviewJSON, {})
  }
}
