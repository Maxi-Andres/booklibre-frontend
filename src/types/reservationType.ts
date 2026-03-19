//! ESTO ES SOLO MOMEMTANEO

export type ReservationState =
  | "AVAILABLE"
  | "BORROWED"
  | "SOON_TO_END"
  | "RETURNED"

export interface ReservationDTO {
  id: number
  bookTitle: string
  bookAuthor: string
  bookCover: string
  rating: number
  loanedBy: string
  pickUpDate: string
  dropOffDate: string
  bibliokarmas: number
  state: ReservationState
  soonToEnd: boolean
  canRate: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapReservation = (res: any): ReservationDTO => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // normalize a medianoche local

  // Parsear "2026-03-20" sin timezone issues
  const [py, pm, pd] = res.pickUpDate.split("-").map(Number)
  const [dy, dm, dd] = res.dropOffDate.split("-").map(Number)
  const pickUp = new Date(py, pm - 1, pd) // mes es 0-indexed
  const dropOff = new Date(dy, dm - 1, dd)

  const daysLeft = (dropOff.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)

  const state: ReservationState =
    today > dropOff
      ? "RETURNED"
      : today < pickUp
        ? "BORROWED" // reserva futura, aún no empezó
        : daysLeft <= 2
          ? "SOON_TO_END" // vence en 3 días o menos
          : "AVAILABLE" // activa ahora

  return {
    id: res.id,
    bookTitle: res.book.title,
    bookAuthor: res.book.author.name,
    bookCover: res.book.imageSrc ?? "",
    rating: res.review?.rating ?? 0,
    loanedBy: res.book.owner.name,
    pickUpDate: res.pickUpDate,
    dropOffDate: res.dropOffDate,
    bibliokarmas: res.user.bibliokarmas,
    state,
    soonToEnd: res.soonToEnd,
    canRate: state === "RETURNED",
    // canRate: res.state === "RETURNED" && res.review?.rating === 0,
  }
}
