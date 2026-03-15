import type { BookGender } from "./bookGender"


export type BookFilters = {
  title: string,
  genders: BookGender[],
  pagesRangeMin: number,
  pagesRangeMax: number,
  pickUpDate: Date,
  dropOffDate: Date,
  ISBN: string,
  ownersName: string,
  page: number,
  pageSize: number
}