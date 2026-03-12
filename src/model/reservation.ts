
export class Reservation {
  id: number
  userId: number
  pickUpDate: Date
  dropOffDate: Date

  constructor(
    id: number = 0,
    userId: number = 0,
    pickUpDate: Date = new Date(),
    dropOffDate: Date = new Date()
  ) {
    this.id = id
    this.userId = userId
    this.pickUpDate = pickUpDate
    this.dropOffDate = dropOffDate
  }

  // resto las fechas en milisegundos y convierto a días.
  reservationDays(): number {
    return Math.floor((this.dropOffDate.getTime() - this.pickUpDate.getTime()) / (1000 * 60 * 60 * 24))
  }

}