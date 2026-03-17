import { REST_SERVER_URL, sessionId } from "@/config/configuration"
import axios from "axios"
import { getAxiosData } from "./common"
import { mapReservation, type ReservationDTO } from "@/types/reservationType"
import type { ReservationProfileBookJSON } from "@/json/reservationJSON"
import { ReservationProfileBook } from "@/model/reservationProfile"

class ReserveService {
  async getUserReadBooksNumber(): Promise<number> {
    return getAxiosData<number>(() =>
      axios.get<number>(REST_SERVER_URL + `/userReadBooks/${sessionId}`),
    )
  }

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
    return data.map(mapReservation)
  }

  async getUserOwnBooks(filterCriteria: string, sortCriteria: string): Promise<ReservationProfileBook[]> {
    const response = () =>
      axios.get<ReservationProfileBookJSON[]>(
        REST_SERVER_URL + `/userOwnBooks/${sessionId}?filterCriteria=${filterCriteria}&sortCriteria=${sortCriteria}`,
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
