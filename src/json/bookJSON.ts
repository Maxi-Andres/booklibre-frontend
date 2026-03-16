import type { BookGender } from "@/types/bookGender"
import type { BookType } from "@/types/bookType"
import type { Languages } from "@/types/languages"
import type { UserProfileJSON } from "./userProfileJSON"

export type BookJSON = {
  id: number
  title: string
  bookType: BookType // string?
  desc: string
  gender: BookGender // string?
  authorName: string
  authorAvatarUrl: string
  numPages: number
  isbn: string
  language: Languages // string?
  editorial: string
  publishDate: Date
  condition: string
  reservetionsIds: number[]
  owner: UserProfileJSON
  imageSrc: string
}

export type ProfileBookJSON = {
  id: number,
  title: string,
  authorName: string,
  gender: BookGender,
  timestamp: string
  imageSrc: string,
}
