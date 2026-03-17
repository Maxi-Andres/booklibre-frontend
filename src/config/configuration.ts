export const REST_SERVER_URL = "http://localhost:9000"

sessionStorage.setItem("userIDtest", "3") // ->
export const sessionId = sessionStorage.getItem("userIDtest")

export interface PaginationData {
  page: number
  limit: number
}
