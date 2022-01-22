import {
    Book
} from "./Book.js"

import {
    User
} from "./User.js"
import {
    checkInstance,
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
    listOfBookings: IBooking[]
    listOfUsers: IUser[]

    constructor() {
        this.listOfBooks = []
        this.listOfAvailableBooks = []
        this.listOfUsers = []
        this.listOfBookings = []
    }


    addBookToListofAllBooks(newAddedBook: IBook) {
        checkInstance(newAddedBook, Book, "Invalid Book")



        const indexOfNewAddedBook = this.listOfBooks.findIndex((avBookIndex) => {
            return avBookIndex.uuidv4 === newAddedBook.uuidv4
        })

        if (indexOfNewAddedBook !== -1) {
            this.listOfBooks[indexOfNewAddedBook].quantity += 1;
            return
        }

        this.listOfBooks.push(newAddedBook)
    }


    addBookToSpecifiedList(listName: "availableBooks", newAddedBook: IBook) {
        checkInstance(newAddedBook, Book, "Invalid Book")

        switch (listName) {
            case "availableBooks":
                this.listOfAvailableBooks.push(newAddedBook)
                break;
            default:
        }

    }

    removeBookFromSpecifiedList(listName: "listOfAvailableBooks", bookToRemove: IBook) {

        checkInstance(bookToRemove, Book, "Invalid Book")

        const indexOfRemovingBookInAvailableList = this[listName].findIndex((availableBook) => {
            return availableBook.uuidv4 === bookToRemove.uuidv4
        })

        if (indexOfRemovingBookInAvailableList === -1) throw Error("This book is not on the list.")

        let quantityOfRemovedBook = this[listName][indexOfRemovingBookInAvailableList].quantity



        if (quantityOfRemovedBook > 1) {
            quantityOfRemovedBook -= 1
        } else {
            this[listName].splice(indexOfRemovingBookInAvailableList, 1)
        }

        // switch (listName) {
        //     case "availableBooks":

        //         const indexOfRemovingBookInAvailableList = this.listOfAvailableBooks.findIndex((availableBook) => {
        //             return availableBook.uuidv4 === bookToRemove.uuidv4
        //         })

        //         if (indexOfRemovingBookInAvailableList === -1) throw Error("This book is not on the list.")

        //         let quantityOfRemovedBook = this.listOfAvailableBooks[indexOfRemovingBookInAvailableList].quantity




        //         if (quantityOfRemovedBook > 1) {
        //             quantityOfRemovedBook -= 1
        //         } else { this.listOfAvailableBooks.splice(indexOfRemovingBookInAvailableList, 1) }
        //         break;
        //     case "borrowedBooks":
        //         const indexOfRemovingBookInBorrowedList = this.listOfBorrowedBooks.findIndex((availableBook) => {
        //             return availableBook.uuidv4 === bookToRemove.uuidv4
        //         })

        //         let quantityOfRemovedBookBorrowed = this.listOfBorrowedBooks[indexOfRemovingBookInBorrowedList].quantity


        //         if (indexOfRemovingBookInBorrowedList === -1) throw Error("This book is not on the list.")


        //         if (quantityOfRemovedBookBorrowed <= 2) {
        //             quantityOfRemovedBookBorrowed -= 1
        //         } else if (quantityOfRemovedBookBorrowed === 1) {
        //             this.listOfBorrowedBooks.splice(indexOfRemovingBookInBorrowedList, 1)
        //         }
        //     default:
        //         throw Error("Invalid list name");
        // }
    }

    addUserToList(user: IUser) {

        const indexOfUser = this.listOfUsers.findIndex((listUser) => {
            return listUser.id === user.id
        })

        if (indexOfUser !== -1) throw Error("This user alreay exists.")

        this.listOfUsers.push(user)
    }

    borrowBookForUser(user: IUser, bookToBorrow: IBook) {

        const indexOfUser = this.listOfUsers.findIndex((userList) => {
            return userList.id === user.id
        })

        if (indexOfUser === -1) {
            this.listOfUsers.push(user)
        }

        const indexOfBookToBorrow = this.listOfAvailableBooks.findIndex((availableBook) => {
            return availableBook.uuidv4 === bookToBorrow.uuidv4
        })

        if (indexOfBookToBorrow === -1) throw Error("There is no book that you are looking for.")

        const newBooking = new Booking(user)
        this.listOfAvailableBooks.splice(indexOfBookToBorrow, 1)

        newBooking.borrowBook(bookToBorrow)

    }

    returnBookByUser(userBooking: IBooking, bookToReturn: IBook) { // userBooking, bookToReturn

        const indexOfBooking = this.listOfBookings.findIndex((bookingElement) => {
            return bookingElement.uuid === userBooking.uuid
        })

        if (indexOfBooking === -1) throw Error("There is no booking like this.")

        const listOfBookingBorrowedBooks = this.listOfBookings[indexOfBooking].listOfBorrowBooks

        const indexOfBorrowedBookInBookingList = listOfBookingBorrowedBooks.findIndex((borrowedBook) => {
            return borrowedBook.uuidv4 === bookToReturn.uuidv4
        })

        const howManyBooksAreInUserBooking = listOfBookingBorrowedBooks.length

        if (indexOfBorrowedBookInBookingList !== -1 && howManyBooksAreInUserBooking <= 1) {
            const returnBookPenalty = userBooking.returnBook(bookToReturn)

            if (returnBookPenalty > 0) {
                console.log(`Przykro nam ${userBooking.user.name} musisz dopłacić ${returnBookPenalty}zł za przekroczenie terminu zwrotu.`);
            } else {
                console.log(`Dziękujemy ${userBooking.user.name} za terminowe zwrócenie książki.`)
            }



            this.listOfBookings.splice(indexOfBooking, 1)

            return


        } else if (indexOfBorrowedBookInBookingList !== -1) {

            const returnBookPenalty = userBooking.returnBook(bookToReturn)

            if (returnBookPenalty > 0) {
                console.log(`Przykro nam ${userBooking.user.name} musisz dopłacić ${returnBookPenalty}zł za przekroczenie terminu zwrotu.`);
            } else {
                console.log(`Dziękujemy ${userBooking.user.name} za terminowe zwrócenie książki.`)
            }



            listOfBookingBorrowedBooks.splice(indexOfBorrowedBookInBookingList, 1)
            return
        }

        throw Error("The book that you want to return is not on your borowed book list.")


    }
}

export default Liblary