import type { BookGender } from "@/types/bookGender"
import type { BookType } from "@/types/bookType"
import type { Languages } from "@/types/languages"
import type { UserProfileJSON } from "./userProfileJSON"
import { Book } from "@/model/book"


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
  timestamp: Date
  imageSrc: string,
}

//esto es para la creacion/actualizacion del libro

export interface BookCreateDTO {
  title: string
  bookType: string
  desc: string
  gender: string
  authorName: string
  authorAvatarUrl: string
  numPages: number
  isbn: string
  language: string
  editorial: string
  publishDate: string
  condition: string
  imageSrc: string
  ownerId: number
}

export const toBookCreateDTO = (book: Book): BookCreateDTO => ({
  title: book.title,
  bookType: book.bookType,
  desc: book.desc,
  gender: book.gender,
  authorName: book.author.name,
  authorAvatarUrl: book.author.avatar,
  numPages: book.numPages,
  isbn: book.isbn,
  language: book.language,
  editorial: book.editorial,
  publishDate: book.publishDate ? new Date(book.publishDate).toISOString().split('T')[0] : '',
  condition: book.condition,
  imageSrc: book.imageSrc,
  ownerId: Number(localStorage.getItem('id'))
})
