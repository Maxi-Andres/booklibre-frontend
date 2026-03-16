import type { Author } from "@/model/author"
import type { BookReview } from "@/model/review"
import type { UserProfile } from "@/model/userProfile"
import type { BookCondition } from "@/types/bookCondition"
import type { BookGender } from "@/types/bookGender"
import type { BookType } from "@/types/bookType"
import type { Languages } from "@/types/languages"

export type BookJSON = {
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
}

export type ProfileBookJSON = {
  id: number,
  title: string,
  authorName: string,
  gender: BookGender,
  timestamp: string
  imageSrc: string,
}
