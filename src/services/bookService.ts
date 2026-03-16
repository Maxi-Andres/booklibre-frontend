import { REST_SERVER_URL, sessionId } from "@/config/configuration";
import { booksMOCK } from "@/mocks/booksMOCK";
import { Book } from "@/model/book";
import type { Reservation } from "@/model/reservation";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
import { getAxiosData } from "./common";


class BookService {

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

}

export const bookService = new BookService()