import {
    arrOfBooksData
} from './bookDescriptionData.js';


const stringValidation = (validatedString) => {
    if (!validatedString.length < 2) throw Error("Data have to be a string.")
}

const numberValidation = (validatedNumber) => {
    if (!isFinite(validatedNumber)) throw Error("Data have to be a number.")
}

const randomNumberInRange = (min, max) => {
    numberValidation(min)
    numberValidation(max)

    return Math.floor(Math.random() * (max - min) + min

    )
}

const checkInstance = (instance, className, errorText) => {
    if (!instance instanceof className) throw Error(errorText);
}

const subtractDates = (returnDate, borrowDate) => {
    const substractResult = ((returnDate.getTime()) - borrowDate.getTime()) / 86400000
    return substractResult
}

const randomBookDescription = () => {
    const randomNumber = randomNumberInRange(0, arrOfBooksData.length)
    return arrOfBooksData[randomNumber]
}

const checkIfKeyIsCorrect = (key, aveliableKeys) => {
    if (!aveliableKeys.includes(key)) throw Error("Invalid key value. Aveliable keys: availableBooks, borrowedBooks")
}

export {
    stringValidation,
    numberValidation,
    randomBookDescription,
    subtractDates,
    checkInstance,
    checkIfKeyIsCorrect
}