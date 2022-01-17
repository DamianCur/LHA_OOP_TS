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


class Booking {
    constructor(bookingUser) {

        checkInstance(bookingUser, User, "Invalid User.")

        this.user = bookingUser
        this.borrowDate = new Date()
        this.returnDate = new Date()
        this.listOfBorrowBooks = []
        this.penalty = 0
    }

   
    borrowBook(bookName) {
        checkInstance(bookName, Book, "Invalid instance of book")

        this.listOfBorrowBooks.push(bookName)
        this.borrowDate = new Date().toLocaleDateString()

    }

    returnBook(bookName) {
        checkInstance(bookName, Book, "Invalid instance of book")

        const indexOfReturningBook = this.listOfBorrowBooks.indexOf(bookName)
        this.listOfBorrowBooks.splice(indexOfReturningBook, 1)

        this.returnDate = new Date()


        if (subtractDates(this.returnDate, this.borrowDate) > 7) {
            this.penalty = (subtractDates(this.returnDate, this.borrowDate) - 7) * 2
        }

    }
}

export {
    Booking
}