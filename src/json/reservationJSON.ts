import type { ReservationState } from "@/types/reservationState"
<<<<<<< HEAD
import type { BookJSON, ProfileBookJSON } from "./bookJSON"
=======
import type { BookJSON } from "./bookJSON"
>>>>>>> feature/bookFiltering
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
<<<<<<< HEAD
}

export type ReservationProfileBookJSON = {
  id: number
  book: ProfileBookJSON
  state: string
}
=======
}
>>>>>>> feature/bookFiltering
