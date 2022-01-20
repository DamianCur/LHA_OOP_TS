import {
    arrOfBooksData
} from './bookDescriptionData.js';


const stringValidation = (validatedString: string) => {
    if (validatedString.length <= 2) throw Error("Data have to be a string.")
}

const numberValidation = (testingNumber: number) => {
    if (!isFinite(testingNumber)) throw Error("Invalid number")
}

const randomNumberInRange = (min: number, max: number): number => {
    numberValidation(min) 
    numberValidation(max)

    return Math.floor(Math.random() * (max - min) + min)
}

const checkInstance = (instance: any, className: any, errorText: string) => {
    if (!(instance instanceof className)) throw Error(errorText);
}

const subtractDates = (returnDate: Date, borrowDate: Date) => {
    const substractResult = ((returnDate.getTime()) - borrowDate.getTime()) / 86400000
    return substractResult
}

const randomBookDescription = () => {
    const randomNumber = randomNumberInRange(0, arrOfBooksData.length)
    return arrOfBooksData[randomNumber]
}



export {
    numberValidation,
    stringValidation,
    randomBookDescription,
    subtractDates,
    checkInstance,
}