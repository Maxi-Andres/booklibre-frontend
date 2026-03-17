import { REST_SERVER_URL, sessionId } from "@/config/configuration";
import { booksMOCK } from "@/mocks/booksMOCK";
import { Book } from "@/model/book";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
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

}

export const bookService = new BookService()