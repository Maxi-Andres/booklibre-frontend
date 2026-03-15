import { REST_SERVER_URL } from "@/config/configuration"
import axios from "axios"
import { getAxiosData } from "./common"

class ReserveService {
  async getUserReadBooks(): Promise<number> {
    const userId = localStorage.getItem("id")

    return getAxiosData<number>(() =>
      axios.get<number>(REST_SERVER_URL + `/userReadBooks/${userId}`),
    )
  }

  async getReservesByUserId(search: string) {
    return axios.get(
      REST_SERVER_URL + "/lector/" + sessionStorage.getItem("userIDtest"),
      {
        params: {
          search: search,
        },
      },
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
