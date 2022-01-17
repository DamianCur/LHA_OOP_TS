import {
    v4 as uuidv4
} from 'uuid';
uuidv4();

import {switchStringValidation, stringValidation, emailValidaiton} from './utility.js'

class Contact {
    constructor(name, surname, email) {
        stringValidation(name)
        stringValidation(surname)
        emailValidaiton(email)

        this.name = name
        this.surname = surname
        this.email = email
        this.modificateDate = new Date().toLocaleDateString()
        this.createdDate = new Date().toLocaleDateString()
        this.uuid = uuidv4()
    }

    changeName(value) {
        switchStringValidation("Name", value)
        this.name = value
        this.modificateDate = new Date().toLocaleDateString()
    }

    changeSurename(value) {
        if (typeof value !== "string" || value.length === 0) throw Error("You have to type in value.")
        this.surname = value
        this.modificateDate = new Date().toLocaleDateString()
    }

    changeEmail(value) {
        emailValidaiton(value)
        if (typeof value !== "string" || value.length === 0) throw Error("You have to type in value.")
        this.email = value
        this.modificateDate = new Date().toLocaleDateString()
    }

    changeData(key, value) {
        switch (key) {
            case "name":
                this.changeName(value)
                break;
            case "surname":
                this.changeSurename(value)
                break;
            case "email":
                this.changeEmail(value)
                break;
            case "modificateDate":
                this.modificateDate = new Date().toLocaleDateString()
                break;
            default:
                throw Error("You passed an invalid key.")

        }
    }   

    findPhrase() { // phrase
        const values = Object.values(this);

        // .some
    }
}





export default Contact