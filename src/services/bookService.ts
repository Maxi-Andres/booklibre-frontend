import { REST_SERVER_URL } from "@/config/configuration";
import { booksMOCK } from "@/mocks/booksMOCK";
import { Book } from "@/model/book";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
import { getAxiosData } from "./common";
import type { BookJSON } from "@/json/bookJSON";
import type { PageResponse } from "@/types/pageResponse";


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

  // -- LIBROS FILTRADOS PARA PAGINACION EN HOME --
  async getFilteredBooksPage(filters: BookFilters): Promise<PageResponse<BookJSON>> {
    const response = () => axios.post<PageResponse<BookJSON>>(
      REST_SERVER_URL + `/filtered-books`,
      filters
    )
    const data = (await response()).data
    return data
  }

  async getBookDetail(id: number){
    const queryById = () => axios.get<BookJSON>(REST_SERVER_URL + '/book-detail/' + id)
    const bookJSON = await getAxiosData(queryById)
    return Book.fromJSON(bookJSON)
  }
}

export const bookService = new BookService()