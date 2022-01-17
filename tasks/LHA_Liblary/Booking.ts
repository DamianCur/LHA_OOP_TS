import {
    Book
} from "./Book.js"
import {
    User
} from "./User.js"

import {
    subtractDates,
    checkInstance
} from "./utility.js"

import {
    IBookDescription,
    IBookingUser,
    IBook
} from './types'


class Booking {

    user: IBookingUser;
    borrowDate: Date;
    returnDate: Date;
    listOfBorrowBooks: IBook[];
    penalty: number;

    constructor(bookingUser: IBookingUser) {

        // checkInstance(bookingUser, User, "Invalid User.")

        this.user = bookingUser
        this.borrowDate = new Date()
        this.returnDate = new Date()
        this.listOfBorrowBooks = []
        this.penalty = 0
    }


    borrowBook(bookName: IBook): void {
        // checkInstance(bookName, Book, "Invalid instance of book")


        this.listOfBorrowBooks.push(bookName)
        this.borrowDate = new Date()
    }

    returnBook(bookName: IBook) {
        // checkInstance(bookName, Book, "Invalid instance of book")
        const conditionIndexOfReturningBook = (el: IBook) => {
            el.uuidv4 === bookName.uuidv4
        }

        const indexOfReturningBook = this.listOfBorrowBooks.findIndex(conditionIndexOfReturningBook)
        this.listOfBorrowBooks.splice(indexOfReturningBook, 1)

        this.returnDate = new Date()

        if (subtractDates(this.returnDate, this.borrowDate) > 7) {
            this.penalty = (subtractDates(this.returnDate, this.borrowDate) - 7) * 2
        }

        return this.penalty
    }
}

export {
    Booking,
}