import {
    v4 as uuidv4
} from 'uuid';
uuidv4();

import {stringValidation, emailValidaiton } from './utility'


type availableKeys = "name" | "surname" | "email" | "modificateDate";

class Contact {

    name: string;
    surname: string;
    email: string;
    modificateDate: string;
    createdDate: string;
    uuid: string
    



    constructor(name: string, surname: string, email: string) {
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

    changeName(value: string) {
        this.name = value
        this.modificateDate = new Date().toLocaleDateString()
    }

    changeSurename(value: string) {
        if (value.length === 0) throw Error("You have to type in value.")
        this.surname = value
        this.modificateDate = new Date().toLocaleDateString()
    }

    changeEmail(value: string) {
        emailValidaiton(value)
        if (value.length === 0) throw Error("You have to type in value.")
        this.email = value
        this.modificateDate = new Date().toLocaleDateString()
    }

    changeData(key: availableKeys, value: string) {
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

    // findPhrase() { 
    //     const values = Object.values(this);

    //     // .some
    // }
}





export default Contact