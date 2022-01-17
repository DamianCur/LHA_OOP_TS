import {
    Book
} from "./Book.js"

import {
    User
} from "./User.js"
import {
    checkInstance,
    // checkIfKeyIsCorrect
} from "./utility.js"

import { 
    Booking
 } from './Booking'






import {
    IBookDescription,
    IBookingUser,
    IBook,
    IUser,
    IBooking
} from './types'

class Liblary {
    listOfBooks: IBook[]
    listOfAvailableBooks: IBook[]
    listOfBorrowedBooks: IBook[]
    listOfUsers: IUser[]

    constructor() {
        this.listOfBooks = []
        this.listOfAvailableBooks = []
        this.listOfBorrowedBooks = []
        this.listOfUsers = []
    }


    addBookToListofAllBooks(newAddedBook: IBook) {
        checkInstance(newAddedBook, Book, "Invalid Book")

        // findIndex
        const conditionFindIndexOfBook = (el: IBook) => {
            el.uuidv4 === newAddedBook.uuidv4
        }

        if (this.listOfBooks.findIndex(conditionFindIndexOfBook)) throw Error("This book is already in this list.")
        this.listOfBooks.push(newAddedBook)
    }


    addBookToSpecifiedList(listName: "availableBooks" | "borrowedBooks", newAddedBook: IBook) {
        checkInstance(newAddedBook, Book, "Invalid Book")

        const aveliableLists = ["availableBooks", "borrowedBooks"]

        switch (listName) {
            case "availableBooks":
                this.listOfAvailableBooks.push(newAddedBook)
                break;
            case "borrowedBooks":
                this.listOfBorrowedBooks.push(newAddedBook)
                break;
            default:
                // checkIfKeyIsCorrect(listName, aveliableLists)
        }

    }

    removeBookFromSpecifiedList(listName: "availableBooks" | "borrowedBooks", bookToRemove: IBook) {
        checkInstance(bookToRemove, Book, "Invalid Book")

        const aveliableLists = ["availableBooks", "borrowedBooks"]

        if (!aveliableLists.includes(listName)) throw Error("Invalid list name.")

        switch (listName) {
            case "availableBooks":
                if (!this.listOfAvailableBooks.includes(bookToRemove)) throw Error("This book is not in the list.")

                const indexOfAvailableRemovedBook = this.listOfAvailableBooks.indexOf(bookToRemove)

                this.listOfAvailableBooks.splice(indexOfAvailableRemovedBook, 1)
                break;
            case "borrowedBooks":
                if (!this.listOfBorrowedBooks.includes(bookToRemove)) throw Error("This book is not in the list.")

                const indexOfBorrowedRemovedBook = this.listOfBorrowedBooks.indexOf(bookToRemove)
                this.listOfBorrowedBooks.splice(indexOfBorrowedRemovedBook, 1)
                break;
            default:
                throw Error("Invalid list name");
        }
    }

    addUserToList(user: IUser) {
        checkInstance(user, User, "Invalid user")

        if (this.listOfUsers.includes(user)) throw Error("This user already exists")

        // this.listOfUsers.push(user)
    }

    borrowBookForUser(userName: IUser, bookToBorrow: IBook) {
        checkInstance(userName, User, "Invalid user")
        checkInstance(bookToBorrow, Book, "Invalid book")


        if (!this.listOfUsers.some((user) => {
            user.id === userName.id
        })) this.listOfUsers.push(userName)

        this.listOfBorrowedBooks.push(bookToBorrow)

        // const Booking: IBooking = new Booking(userName))
        //PROBLEM Z IMPORTEM KLASY

        // new Booking / dodajesz do bookingu - bookToBorrow
    }

    returnBookByUser(userName: IUser, bookToReturn: IBook) {

        checkInstance(userName, User, "Invalid user")
        checkInstance(bookToReturn, Book, "Invalid book")

        if (!this.listOfBorrowedBooks.includes(bookToReturn)) throw Error("This book is not on the list.")

        // const indexOfUserBorrowedList = userName.listOfBorrowedBooks.indexOf(bookToReturn)
        // userName.listOfBorrowedBooks.splice(indexOfUserBorrowedList, 1)

        const indexOfBorrowedList = this.listOfBorrowedBooks.indexOf(bookToReturn)
        this.listOfBorrowedBooks.splice(indexOfBorrowedList, 1)
    }

    // AddressBook-medium
}

export default Liblary