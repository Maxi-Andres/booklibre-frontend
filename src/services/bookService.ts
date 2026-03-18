import { REST_SERVER_URL, sessionId } from "@/config/configuration";
import { booksMOCK } from "@/mocks/booksMOCK";
import { Book } from "@/model/book";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
import { getAxiosData } from "./common";
import { toBookCreateDTO, type BookJSON } from "@/json/bookJSON";
import type { PageResponse } from "@/types/pageResponse";


class BookService {

  async getBookByID(id: number): Promise<Book | undefined>{
    return  booksMOCK.find(book => book.id === id)
  }

  async createBook(book: Book): Promise<Book> { 
  const response = () => axios.post<Book>(
    REST_SERVER_URL + `/crear-libro`, toBookCreateDTO(book)
  )
  return (await getAxiosData(response))
}

async updateBook(id: number, book: Book): Promise<Book> {
  const response = () => axios.put<Book>(
    REST_SERVER_URL + `/editar-libro/${id}`, toBookCreateDTO(book)
  )
  return (await getAxiosData(response))
}

  // async createBook(book:Book): Promise<Book>{
  //   const newBook = Object.assign(new Book (), book, {id:booksMOCK.length+1})
  //   booksMOCK.push(newBook)
  //   console.log(newBook)
  //   return newBook
  // }

  // async updateBook(id:number, book:Book): Promise<Book | undefined>{
  //   const index = booksMOCK.findIndex(b => b.id === id)
  //   if (index === -1) return undefined
  //   booksMOCK[index] = Object.assign(new Book(), book)
  //   return booksMOCK[index]
  // }

  async getAvailableBooks(filters: BookFilters): Promise<Book[]> {
    //TODO: backend call filteredBooks(), query body: filters (type/object?)
    //! check how to send reservation because of DATES !!!"%#$¡
    return booksMOCK
  }

  // -- LIBROS FILTRADOS PARA PAGINACION EN HOME --
  async getFilteredBooksPage(filters: BookFilters): Promise<PageResponse<BookJSON>> {
    const response = () => axios.post<PageResponse<BookJSON>>(
      REST_SERVER_URL + `/filtered-books`,
      filters
    )
    const data = (await response()).data
    return data
  }

  async getUserOwnBooks(): Promise<Book[]> {
    const response = () => axios.get<Book[]>(
      REST_SERVER_URL + `/userOwnBooks/${localStorage.getItem('id')}`
    )
    return (await getAxiosData(response))
  }

}

export const bookService = new BookService()