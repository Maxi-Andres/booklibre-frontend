import { BookType } from "../types/bookType"
import { BookGender } from "../types/bookGender"
import { Languages } from "../types/languages"
import { BookCondition } from "../types/bookCondition"
import { Author } from "./author"
import { UserProfile } from "./userProfile"
import type { BookJSON } from "@/json/bookJSON"
import { ValidationMessage } from "@/validation/validationMessage"

export class Book {
  errors: ValidationMessage[] = []

  public id: number
  public title: string
  public bookType: BookType
  public desc: string
  public gender: BookGender
  public author: Author
  public numPages: number
  public isbn: string
  public language: Languages
  public editorial: string
  public publishDate: Date
  public condition: BookCondition
  public imageSrc: string
  public owner: UserProfile
  public bookBibliokarmas: number
  public rating: number = 0

  constructor(
    id: number = 0,
    title: string = "",
    bookType: BookType = BookType.Common,
    desc: string = "",
    gender: BookGender = BookGender.DRAMA,
    author: Author = new Author(),
    numPages: number = 0,
    isbn: string = "",
    language: Languages = Languages.SPANISH,
    editorial: string = "",
    publishDate: Date = new Date(),
    condition: BookCondition = BookCondition.GOOD,
    imageSrc: string = "",
    owner: UserProfile = new UserProfile(),
    bookBibliokarmas: number = 0,
    rating: number = 0
  ) {
    this.id = id
    this.title = title
    this.bookType = bookType
    this.desc = desc
    this.gender = gender
    this.author = author
    this.numPages = numPages
    this.isbn = isbn
    this.language = language
    this.editorial = editorial
    this.publishDate = publishDate
    this.condition = condition
    this.imageSrc = imageSrc
    this.owner = owner
    this.bookBibliokarmas = bookBibliokarmas
    this.rating = rating
  }

  static fromJSON(bookJSON: BookJSON): Book {
    const book = Object.assign(new Book(), bookJSON, {
      author: new Author(0, bookJSON.authorName, bookJSON.authorAvatarUrl),
      publishDate: new Date(bookJSON.publishDate),
    })
    return book
  }

  addError(field: string, message: string) {
      this.errors.push(new ValidationMessage(field, message))
    }

    private isValidISBN13(isbn: string): boolean {
    // Saca los guiones y espacios
    const clean = isbn.replace(/[-\s]/g, '')

    // valida longitud, debe tener exactamente 13 dígitos
    if (!/^\d{13}$/.test(clean)) return false

    // Debe empezar con 978 o 979
    if (!clean.startsWith('978') && !clean.startsWith('979')) return false

    // Validación del dígito verificador
    const sum = clean
        .slice(0, 12)
        .split('')
        .reduce((acc, digit, i) => {
            const multiplier = i % 2 === 0 ? 1 : 3
            return acc + Number(digit) * multiplier
        }, 0)

    const checkDigit = (10 - (sum % 10)) % 10

    return checkDigit === Number(clean[12])
}

  validate() {
  this.errors = [];

  if (!this.title?.trim()) {
    this.addError('title', 'Debe ingresar el titulo del libro');
  } 

  if (!this.desc?.trim()) {
    this.addError('desc', 'Debe ingresar una descripcion');
  } 

  if (!this.imageSrc) {
    this.addError('imageSrc', 'Debe ingresar una imagen del libro');
  } 


  if (!this.author.name) {
    this.addError('author', 'Debe ingresar el autor');
  } 

  if (!this.numPages || this.numPages <= 0) {
    this.addError('numPages', 'Debe ingresar la cantidad de paginas');
  } 

  if (this.numPages > 1500) {
    this.addError('numPages', 'El libro no debe tener mas de 1500 paginas');
  }

  if (!this.isbn?.trim()) {
        this.addError('isbn', 'Debe ingresar el ISBN')
    } else if (!this.isValidISBN13(this.isbn)) {
        this.addError('isbn', 'El ISBN no tiene un formato válido (ej: 978-3-16-148410-0)')
    } 

  if (!this.editorial?.trim()) {
    this.addError('editorial', 'Debe ingresar la editorial');
  }

  if (!this.publishDate) {
    this.addError('publishDate', 'Debe ingresar la fecha de publicación');
  }

  return this.errors;
}

  
}
