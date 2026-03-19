//! ESTO ES SOLO MOMEMTANEO

export type ReservationState =
  | "AVAILABLE"
  | "ACTIVE"
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
export const mapReservation = (res: any): ReservationDTO => ({
  id: res.id,
  bookTitle: res.book.title,
  bookAuthor: res.book.author.name,
  bookCover: res.book.imageSrc ?? "",
  rating: res.review?.rating ?? 0,
  loanedBy: res.book.owner.name, // el nombre del usuario que tiene el libro es el que lo presta
  pickUpDate: res.pickUpDate,
  dropOffDate: res.dropOffDate,
  bibliokarmas: res.user.bibliokarmas,
  state: res.state,
  soonToEnd: res.soonToEnd,
  canRate: res.state === "RETURNED" && res.review?.rating === 0,
})
