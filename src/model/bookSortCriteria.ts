import type { Book } from "./book";

export interface BookSortCriteria {
  sort(books: Book[]): Book[]
  type: string
}

export class SortByTitle implements BookSortCriteria {
  type = "title"
  sort(books: Book[]): Book[] {
    return books.sort((a, b) => a.title.localeCompare(b.title))
  }
}

export class SortByAuthor implements BookSortCriteria {
  type = "author"
  sort(books: Book[]): Book[] {
    return books.sort((a, b) => a.author.name.localeCompare(b.author.name))
  }
}

export class SortByOwner implements BookSortCriteria {
  type = "owner"
  sort(books: Book[]): Book[] {
    return books.sort((a, b) => a.owner.name.localeCompare(b.owner.name))
  }
}
