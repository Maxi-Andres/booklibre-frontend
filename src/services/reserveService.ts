import { REST_SERVER_URL } from "@/config/configuration"
import axios from "axios"
import { getAxiosData } from "./common"
import type { BookFilters } from "@/types/bookFilters"
import type { PageResponse } from "@/types/pageResponse"
import { Reservation } from "@/model/reservation"
import type { ReservationJSON } from "@/json/reservationJSON"

class ReserveService {
  
  async getUserReadBooks(): Promise<number> {
    const userId = localStorage.getItem("id")

    return getAxiosData<number>(() => axios.get<number>(
      REST_SERVER_URL + `/userReadBooks/${userId}`
    ))
  }


  async getFilteredBooksPage(filters: BookFilters): Promise<PageResponse<ReservationJSON>> {
    const response = () => axios.post<PageResponse<ReservationJSON>>(
      REST_SERVER_URL + `/filtered-reservations`,
      filters
    )
    const data = (await response()).data
    return data
  }



}









export const reserveService = new ReserveService()