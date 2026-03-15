import type { ReservationState } from "@/types/reservationState"
import type { BookJSON, ProfileBookJSON } from "./bookJSON"
import type { ReviewJSON } from "./ReviewJSON"
import type { UserProfileJSON } from "./userProfileJSON"

export type ReservationJSON = {
  id: number
  book: BookJSON
  user: UserProfileJSON
  review: ReviewJSON
  pickUpDate: Date
  dropOffDate: Date
  state: ReservationState
}

export type ReservationProfileJSON = {
  id: number
  book: ProfileBookJSON
  state: String
}