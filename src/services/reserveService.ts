import { REST_SERVER_URL } from "@/config/configuration"
import axios from "axios"
import { getAxiosData } from "./common"
// import { mapReservation, type ReservationDTO } from "@/types/reservationType"
import type { ReservationProfileBookJSON } from "@/json/reservationJSON"
import { ReservationProfileBook } from "@/model/reservationProfile"
import type { BookReview } from "@/model/review"

class ReserveService {
  async getUserReadBooksNumber(): Promise<number> {
    return getAxiosData<number>(() =>
      axios.get<number>(
        REST_SERVER_URL + `/userReadBooks/${localStorage.getItem("id")}`,
      ),
    )
  }

  async createReservation(
    bookId: number,
    pickUpDate: string,
    dropOffDate: string,
  ) {
    const sessionId = localStorage.getItem("id")
    return axios.post(REST_SERVER_URL + "/create-reservation", {
      bookId,
      sessionId,
      pickUpDate,
      dropOffDate,
    })
  }

  async getReviews(bookId: number, page: number, pageSize: number) {
    return axios.get<BookReview[]>(
      `${REST_SERVER_URL}/book-review/${bookId}?page=${page}&pageSize=${pageSize}`,
    )
  }

  async getReservesByUserId(
    userId: string,
    search: string,
    page: number,
    pageSize: number,
  ) {
    // ): Promise<ReservationDTO[]> {
    const { data } = await axios.get(REST_SERVER_URL + "/lector/" + userId, {
      params: { search, page, pageSize },
    })
    console.log(data, "del user")
    return data
  }

  async getLoansMadeByUserId(
    userId: string,
    search: string,
    page: number,
    pageSize: number,
  ) {
    // ): Promise<ReservationDTO[]> {
    const { data } = await axios.get(REST_SERVER_URL + "/owner/" + userId, {
      params: { search, page, pageSize },
    })
    console.log(data, "que le hicieron al user")
    return data
  }

  async rateLoan(
    reservationId: number,
    body: { rate: number; review: string },
  ) {
    const { data } = await axios.patch(
      REST_SERVER_URL + "/" + reservationId + "/calificar",
      {
        id: 0,
        reviewerName: "", // el back lo resuelve con el userId
        rating: body.rate,
        review: body.review,
        timestamp: new Date().toISOString().split("T")[0], // "2024-03-19"
      },
      {
        params: { userId: localStorage.getItem("id") }, // esto es por lo que pusieron en el back en el model de review no se como funciona
      },
    )
    console.log(data) // no se que onda esto
    return data
  }

  async getUserOwnBooks(
    filterCriteria: string,
    sortCriteria: string,
    page: number,
    pageSize: number
  ) {
    const { data } = await axios.get(
        REST_SERVER_URL +
        `/userOwnBooks/${localStorage.getItem("id")}`,
        { params: { filterCriteria, sortCriteria, page, pageSize } }
      )

      console.log(data)
    return data
  }

  async getUserLentBooksNumber(): Promise<number> {
    return getAxiosData<number>(() =>
      axios.get<number>(
        REST_SERVER_URL + `/userLentBooks/${localStorage.getItem("id")}`,
      ),
    )
  }
}

export const reserveService = new ReserveService()
