import { REST_SERVER_URL } from "@/config/configuration";
import { Book } from "@/model/book";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
import { getAxiosData } from "./common";
import { toBookCreateDTO, type BookJSON } from "@/json/bookJSON";
import type { PageResponse } from "@/types/pageResponse";


class BookService {

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


  // -- LIBROS FILTRADOS PARA PAGINACION EN HOME --
  async getFilteredBooksPage(filters: BookFilters): Promise<PageResponse<BookJSON>> {
    const response = () => axios.post<PageResponse<BookJSON>>(
      REST_SERVER_URL + `/filtered-books`,
      filters
    )
    const data = (await response()).data
    // console.log(data)
    return data
  }

  async getBookDetail(id: number){
    const queryById = () => axios.get<BookJSON>(REST_SERVER_URL + '/book-detail/' + id)
    const bookJSON = await getAxiosData(queryById)
    return Book.fromJSON(bookJSON)
  }
}

export const bookService = new BookService()