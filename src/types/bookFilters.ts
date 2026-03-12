import type { Reservation } from "@/model/reservation"


export type BookFilters = {
  genders: string[],
  numPagesRange: {
    min: number,
    max: number
  },
  //-- necesario una Reserva o solo fechaIni - fechaFin ??
  reservation: Reservation,
  ISBN: string,
  ownersName: string
}