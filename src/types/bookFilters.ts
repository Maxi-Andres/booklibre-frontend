import type { BookGender } from "./bookGender"


export type BookFilters = {
  title: string,
  genders: BookGender[],
  pagesRangeMin: number,
  pagesRangeMax: number,
  pickUpDate: string, //! ISO string
  dropOffDate: string, //! ISO string
  isbn: string,
  ownersName: string,
}