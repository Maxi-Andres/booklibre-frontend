import { REST_SERVER_URL } from "@/config/configuration"
import axios from "axios"
import { getAxiosData } from "./common"

class ReserveService {
  
  async getUserReadBooks(): Promise<number> {
    const userId = localStorage.getItem("id")

    return getAxiosData<number>(() => axios.get<number>(
      REST_SERVER_URL + `/userReadBooks/${userId}`
    ))
  }






}









export const reserveService = new ReserveService()