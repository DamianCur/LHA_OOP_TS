import {
    Book
} from "./Book.js"
import {
    User
} from "./User.js"

import {
    v4 as uuidv4
} from 'uuid';

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
    uuid: string;

    constructor(bookingUser: IBookingUser) {



        this.user = bookingUser
        this.borrowDate = new Date()
        this.returnDate = new Date()
        this.listOfBorrowBooks = []
        this.penalty = 0
        this.uuid = uuidv4()
    }


    borrowBook(givenBook: IBook): void {
        this.listOfBorrowBooks.push(givenBook)
        this.borrowDate = new Date()
    }

    returnBook(givenBook: IBook): number {
        const indexOfReturningBook = this.listOfBorrowBooks.findIndex((el) => {
            el.uuidv4 === givenBook.uuidv4
        })

        if (indexOfReturningBook === -1) throw Error(`There is no book like ${givenBook.title}`)

        this.listOfBorrowBooks.splice(indexOfReturningBook, 1)

        this.returnDate = new Date()

        const dayDiffrence = subtractDates(this.returnDate, this.borrowDate);

        if (dayDiffrence > 7) {
            this.penalty = (dayDiffrence - 7) * 2
        }

        return this.penalty
    }
}

export {
    Booking,
}