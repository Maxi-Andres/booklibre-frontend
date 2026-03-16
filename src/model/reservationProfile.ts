import type { ReservationProfileBookJSON } from "@/json/reservationJSON"
import { ProfileBook } from "./bookProfile"

export class ReservationProfileBook {
  id: number
  book: ProfileBook
  state: string

  constructor(
    id: number = -1,
    book: ProfileBook = new ProfileBook(),
    state: string = "",
  ) {
    this.id = id
    this.book = book
    this.state = state
  }

  static fromJSON(
    reservationJSON: ReservationProfileBookJSON,
  ): ReservationProfileBook {
    const book = Object.assign(new ProfileBook(), reservationJSON.book, {})
    const reservation = Object.assign(
      new ReservationProfileBook(),
      reservationJSON,
      {},
    )
    reservation.book = book
    return reservation
  }
}
