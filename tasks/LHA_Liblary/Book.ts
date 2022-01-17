import {
    v4 as uuidv4
} from 'uuid';

import {
    stringValidation,
    randomBookDescription
} from './utility.js';

import {IBookDescription} from './types'




// IBook

class Book {

    title: string;
    author: string
    quantity: number
    description: IBookDescription
    uuidv4: string


    constructor(title: string, author: string, quantity: number) {
        stringValidation(title)
        stringValidation(author)
        // numberValidation(quantity)


        this.title = title
        this.author = author
        this.quantity = quantity
        this.description = randomBookDescription()
        this.uuidv4 = uuidv4()

    }

}

export { Book }