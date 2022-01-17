import {
    v4 as uuidv4
} from 'uuid';
// npm install --save-dev @types/uuid
// @types/uuid

// declarations.ts
// declare module 'uuid';

import {
    stringValidation
} from "./utility.js"

// IUser

class User {
    
    name: string;
    surname: string;
    id: string


    constructor(name: string, surname: string) {
        stringValidation(name)
        stringValidation(surname)

        this.name = name,
            this.surname = surname,
            this.id = uuidv4()
    }

}

export { User }