import {
    v4 as uuidv4
} from 'uuid';
import Contact from './Contact.js';
import {
    stringValidation
} from './utility.js';

class Group {
    constructor(groupName) {
        stringValidation(groupName)

        this.constactList = []
        this.groupName = groupName
        this.uuid = uuidv4()
    }

    addContact(value) {
        if (!value instanceof Contact) throw Error("The object isn't an instance of Contact class")
        this.constactList.push(value)
    }

    removeContact(contactToRemove) {
        if (!this.constactList.includes(contactToRemove)) throw Error("Contact doesn't exists.")
        const indexOfSearchingElement = this.constactList.findIndex(el => {
            el.uuid === contactToRemove.uuid
        })
        this.constactList.splice(indexOfSearchingElement, 1)
    }

    changeGroupName(newGroupName) {
        if (typeof newGroupName !== "string" || newGroupName.length === 0) throw Error(`${newGroupName} is not a valid value.`)
        this.groupName = newGroupName
    }



    isInGroup(secondName) {
        stringValidation(secondName)

        const contactValues = this.constactList.map(contact => {
            return Object.values(contact)
        });

        const isInValues = contactValues.some((values, i, arr) => {

            return values.some(value => {
                return value === secondName
            })
        })

        return isInValues
    }
};

export default Group