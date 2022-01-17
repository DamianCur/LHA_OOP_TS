// Interfejsy do klas

interface IBookDescription {
    bookImg: string,
    description: string
}


interface IBookingUser {
    name: string
    surname: string
    id: string
}

interface IBook {
    title: string;
    author: string
    quantity: number
    description: IBookDescription
    uuidv4: string
}

interface IBookDescription {
    bookImg: string,
    description: string
}

interface IBook {
    title: string;
    author: string
    quantity: number
    description: IBookDescription
    uuidv4: string
}

interface IUser {
    name: string;
    surname: string;
    id: string
}

interface IBooking {
    user: IBookingUser;
    borrowDate: Date;
    returnDate: Date;
    listOfBorrowBooks: IBook[];
    penalty: number;
}

export {
    IBookDescription,
    IBookingUser,
    IBook,
    IUser,
    IBooking
}