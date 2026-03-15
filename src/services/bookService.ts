import { REST_SERVER_URL } from "@/config/configuration";
import { booksMOCK } from "@/mocks/booksMOCK";
import { Book } from "@/model/book";
import type { Reservation } from "@/model/reservation";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
import { getAxiosData } from "./common";


class BookService {

  async getBookByID(id: number): Promise<Book | undefined>{
    return  booksMOCK.find(book => book.id === id)
  }

  async createBook(book:Book): Promise<Book>{
    const newBook = Object.assign(new Book (), book, {id:booksMOCK.length+1})
    booksMOCK.push(newBook)
    console.log(newBook)
    return newBook
  }

  async updateBook(id:number, book:Book): Promise<Book | undefined>{
    const index = booksMOCK.findIndex(b => b.id === id)
    if (index === -1) return undefined
    booksMOCK[index] = Object.assign(new Book(), book)
    return booksMOCK[index]
  }

  async getAvailableBooks(filters: BookFilters): Promise<Book[]> {
    //TODO: backend call filteredBooks(), query body: filters (type/object?)
    //! check how to send reservation because of DATES !!!"%#$¡
    return booksMOCK
  }

  //* Filtrado en front!! con MOCK
  getFilteredBooks(filters: BookFilters): Book[] {
    return booksMOCK.filter(book => {
      const matchesGender =
        filters.genders.length === 0 ||
        filters.genders.includes(book.gender)

      const matchesPages =
        book.pages >= filters.numPagesRange.min &&
        book.pages <= filters.numPagesRange.max

      const matchesISBN =
        filters.ISBN.trim() === "" ||
        book.ISBN.toLowerCase().includes(filters.ISBN.toLowerCase())

      const matchesOwner =
        filters.ownersName.trim() === "" ||
        book.owner.name.toLowerCase().includes(filters.ownersName.toLowerCase())

      return (
        matchesGender &&
        matchesPages &&
        matchesISBN &&
        matchesOwner
      )
    })
  }

  async getUserOwnBooks(): Promise<Book[]> {
    const response = () => axios.get<Book[]>(
      REST_SERVER_URL + `/userOwnBooks/${localStorage.getItem('id')}`
    )
    return (await getAxiosData(response)).map(Book.fromJSON)
  }

}

export const bookService = new BookService()