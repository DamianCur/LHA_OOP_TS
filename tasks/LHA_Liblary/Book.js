import {
    v4 as uuidv4
} from 'uuid';

import {
    stringValidation,
    numberValidation,
    randomBookDescription
} from './utility.js';



class Book {
    constructor(title, author, quantity) {
        stringValidation(title)
        stringValidation(author)
        numberValidation(quantity)


        this.title = title
        this.author = author
        this.quantity = quantity
        this.description = randomBookDescription()
        this.uuidv4 = uuidv4()

    }

}

export {Book}