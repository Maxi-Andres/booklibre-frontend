import { REST_SERVER_URL } from "@/config/configuration";
import { booksMOCK } from "@/mocks/booksMOCK";
import { Book } from "@/model/book";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
import { getAxiosData } from "./common";
import type { BookJSON } from "@/json/bookJSON";
import type { PageResponse } from "@/types/pageResponse";


class BookService {

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

  async getBookDetail(id: number){
    const queryById = () => axios.get<BookJSON>(REST_SERVER_URL + '/book-detail/' + id)
    const bookJSON = await getAxiosData(queryById)
    return Book.fromJSON(bookJSON)
  }

}

export const bookService = new BookService()