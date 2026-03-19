import { REST_SERVER_URL, sessionId } from "@/config/configuration"
import axios from "axios"
import { getAxiosData } from "./common"
import { mapReservation, type ReservationDTO } from "@/types/reservationType"
import type { ReservationProfileBookJSON } from "@/json/reservationJSON"
import { ReservationProfileBook } from "@/model/reservationProfile"
import type { BookReview } from "@/model/review"

class ReserveService {
  async getUserReadBooksNumber(): Promise<number> {
    return getAxiosData<number>(() =>
      axios.get<number>(REST_SERVER_URL + `/userReadBooks/${sessionId}`),
    )
  }

  async createReservation(
    bookId: number,
    pickUpDate: string,
    dropOffDate: string,
  ) {
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

  // async getFilteredBooksPage(filters: BookFilters): Promise<PageResponse<ReservationJSON>> {
  //   const response = () => axios.post<PageResponse<ReservationJSON>>(
  //     REST_SERVER_URL + `/filtered-reservations`,
  //     filters
  //   )
  //   const data = (await response()).data
  //   return data
  // }

  // async getReservesByUserId(search: string): Promise<ReservationDTO[]> {
  //   return axios.get(
  //     REST_SERVER_URL + "/lector/" + sessionStorage.getItem("userIDtest"),
  //     {
  //       params: {
  //         search: search,
  //       },
  //     },
  //   )
  // }
  async getReservesByUserId(
    userId: string,
    search: string,
  ): Promise<ReservationDTO[]> {
    const { data } = await axios.get(REST_SERVER_URL + "/lector/" + userId, {
      params: { search },
    })
    // console.log(data)
    return data.map(mapReservation)
  }

  async getLoansMadeByUserId(
    userId: string,
    search: string,
  ): Promise<ReservationDTO[]> {
    const { data } = await axios.get(REST_SERVER_URL + "/owner/" + userId, {
      params: { search },
    })
    // console.log(data)
    return data.map(mapReservation)
  }

  async getUserOwnBooks(
    filterCriteria: string,
    sortCriteria: string,
  ): Promise<ReservationProfileBook[]> {
    const response = () =>
      axios.get<ReservationProfileBookJSON[]>(
        REST_SERVER_URL +
          `/userOwnBooks/${sessionId}?filterCriteria=${filterCriteria}&sortCriteria=${sortCriteria}`,
      )
    return (await getAxiosData(response)).map(ReservationProfileBook.fromJSON)
  }

  async getUserLentBooksNumber(): Promise<number> {
    return getAxiosData<number>(() =>
      axios.get<number>(REST_SERVER_URL + `/userLentBooks/${sessionId}`),
    )
  }
}

export const reserveService = new ReserveService()

// // ESTAS SON LAS RESERVAS QUE VOS HICISTE
// @GetMapping("/lector/{userId}")
// fun getReservesByUserId(@PathVariable userId: Int, @RequestParam(defaultValue = "") search: String) =
//     reservationService.getReservesByUserId(userId, search)

// // ESTAS SON LAS RESERVAS QUE TE HICIERON A VOS
// @GetMapping("/owner/{userId}")
// fun getLoansMadeByUserId(@PathVariable userId: Int, @RequestParam(defaultValue = "") search: String) =
//     reservationService.getLoansMadeByUserId(userId, search)

// @PatchMapping("/{reservationId}/calificar")
// fun rateLoan(@PathVariable reservationId: Int, @RequestBody body: ReviewDTO) {
//     reservationService.rateLoan(reservationId, body.rate, body.comment)
// }
