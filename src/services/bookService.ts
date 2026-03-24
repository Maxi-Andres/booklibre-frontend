import { REST_SERVER_URL } from "@/config/configuration";
import { Book } from "@/model/book";
import type { BookFilters } from "@/types/bookFilters";
import axios from "axios";
import { getAxiosData } from "./common";
import { toBookCreateDTO, type BookJSON } from "@/json/bookJSON";
import type { PageResponse } from "@/types/pageResponse";
import customAxios from "@/config/customAxios";
import { BookGender } from "@/types/bookGender";
import { getId } from "@/context/AuthContext";


class BookService {

  async createBook(book: Book): Promise<Book> { 
    const response = () => axios.post<Book>(
      REST_SERVER_URL + `/crear-libro`, toBookCreateDTO(book)
    )
    return (await getAxiosData(response))
  }

  async updateBook(id: number, book: Book): Promise<Book> {
    const dto = toBookCreateDTO(book)
    const response = () => axios.put<Book>(
      REST_SERVER_URL + `/editar-libro/${id}`, dto
    )
    return (await getAxiosData(response))
  }

async deleteBook(id: number): Promise<void> {
  const response = () => axios.delete(REST_SERVER_URL + `/eliminar-libro/${id}`)
  return (await getAxiosData(response))
}



  // -- LIBROS FILTRADOS PARA PAGINACION EN HOME --
  async getFilteredBooksPage(filters: BookFilters): Promise<PageResponse<BookJSON>> {
    const response = () => customAxios.get<PageResponse<BookJSON>>(
      REST_SERVER_URL + `/filtered-books`,
      {
        params: { // hace que axios los serialice como query string
          userId: getId(),
            ...filters
        }
      }
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

  async getBookGenders() {
    const response = () => axios.get<string[]>(REST_SERVER_URL + `/book-genders`)
    const data = (await getAxiosData(response))
    
    const genderFilters = data.map ((gender) => {
      return {
        value: gender,
        label: BookGender[gender as keyof typeof BookGender],
        checked: false
      }
    })

    return genderFilters;
  }
}

export const bookService = new BookService()