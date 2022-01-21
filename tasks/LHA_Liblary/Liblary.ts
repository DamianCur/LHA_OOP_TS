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
    listOfBorrowedBooks: IBook[] // IBooking[]
    //dlaczego IBooking czy nie powinna to być lista wypożyczonych książek?
    listOfUsers: IUser[]

    constructor() {
        this.listOfBooks = []
        this.listOfAvailableBooks = []
        this.listOfBorrowedBooks = []
        this.listOfUsers = []
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


    addBookToSpecifiedList(listName: "availableBooks" | "borrowedBooks", newAddedBook: IBook) {
        checkInstance(newAddedBook, Book, "Invalid Book")

        switch (listName) {
            case "availableBooks":
                this.listOfAvailableBooks.push(newAddedBook)
                break;
            case "borrowedBooks":
                this.listOfBorrowedBooks.push(newAddedBook)
                break;
            default:
        }

    }

    removeBookFromSpecifiedList(listName: "availableBooks" | "borrowedBooks", bookToRemove: IBook) {
        checkInstance(bookToRemove, Book, "Invalid Book")

        const aveliableLists = ["availableBooks", "borrowedBooks"]



        if (!aveliableLists.includes(listName)) throw Error("Invalid list name.")

        switch (listName) {
            case "availableBooks":

                const indexOfRemovingBookInAvailableList = this.listOfAvailableBooks.findIndex((availableBook) => {
                    return availableBook.uuidv4 === bookToRemove.uuidv4
                })

                let quantityOfRemovedBook = this.listOfAvailableBooks[indexOfRemovingBookInAvailableList].quantity


                if (indexOfRemovingBookInAvailableList === -1) throw Error("This book is not on the list.")


                if (quantityOfRemovedBook <= 2) {
                    quantityOfRemovedBook -= 1
                } else if (quantityOfRemovedBook === 1) {
                    this.listOfAvailableBooks.splice(indexOfRemovingBookInAvailableList, 1)
                }
                break;



            case "borrowedBooks":
                const indexOfRemovingBookInBorrowedList = this.listOfAvailableBooks.findIndex((availableBook) => {
                    return availableBook.uuidv4 === bookToRemove.uuidv4
                })

                let quantityOfRemovedBookBorrowed = this.listOfBorrowedBooks[indexOfRemovingBookInBorrowedList].quantity


                if (indexOfRemovingBookInBorrowedList === -1) throw Error("This book is not on the list.")


                if (quantityOfRemovedBookBorrowed <= 2) {
                    quantityOfRemovedBookBorrowed -= 1
                } else if (quantityOfRemovedBookBorrowed === 1) {
                    this.listOfAvailableBooks.splice(indexOfRemovingBookInBorrowedList, 1)
                }
            default:
                throw Error("Invalid list name");
        }
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
            //czy mogę od razu tworzyć tutaj usera?
        }
        const booking = new Booking(user)

        const indexOfBookToBorrow = this.listOfAvailableBooks.findIndex((availableBook) => {
            return availableBook.uuidv4 === bookToBorrow.uuidv4
        })

        if (indexOfBookToBorrow === -1) throw Error("There is no book that you are looking for.")

        this.listOfBorrowedBooks.push(bookToBorrow)
        this.listOfAvailableBooks.splice(indexOfBookToBorrow, 1)

        booking.borrowBook(bookToBorrow)

    }

    returnBookByUser(userBooking: IBooking, bookToReturn: IBook) { // userBooking, bookToReturn

        //ponowne wytlumaczenie zmieny typu listy z wypożyczonymi książkami

        // czy isntieje userBooking w tablicy ||  ??

        const indexOfReturningBook = this.listOfBorrowedBooks.findIndex((borrowedBooks) => {
            return borrowedBooks.uuidv4 === bookToReturn.uuidv4
        })

        if (indexOfReturningBook === -1) throw Error("This book is not on borrowed books list.")

        userBooking.returnBook(bookToReturn)

        const quantityOfReturningBook = this.listOfBorrowedBooks[indexOfReturningBook].quantity

        if (quantityOfReturningBook < 2) {
            this.listOfBorrowedBooks.splice(indexOfReturningBook, 1)
        } else {
            this.listOfBorrowedBooks[indexOfReturningBook].quantity -= 1
        }

        this.addBookToSpecifiedList("availableBooks", bookToReturn)

        const userPenalty = userBooking.penalty

        if (userPenalty === 0) {
            console.log(`Dziękujemy ${userBooking.user.name} za terminowe zwrócenie książki.`);
            return
        }


        console.log(`Przykro nam ${userBooking.user.name} musisz dopłacić ${userPenalty}zł za przekroczenie terminu zwrotu.`);
    }
}

export default Liblary