import { UserProfile } from "./userProfile"
import { Book } from "./book"

export class BookReserve {
    user: UserProfile
    book: Book
    pickupDate: Date
    returnDate: Date
    durationInDays: number

    constructor(
        user: UserProfile = new UserProfile(),
        book: Book,
        pickupDate: Date = new Date(),
        returnDate: Date = new Date(),
        durationInDays: number = 0
    ){
        this.user = user
        this.book = book
        this.pickupDate = pickupDate
        this.returnDate = returnDate
        this.durationInDays = durationInDays
    }
}