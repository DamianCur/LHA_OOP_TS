import {
    v4 as uuidv4
} from 'uuid';

import {
    stringValidation
} from './utility';

import { IContact } from './types';

class Group {

    contactList: IContact[]
    groupName: string;
    uuid: string

    constructor(groupName: string) {
        stringValidation(groupName)

        this.contactList = []
        this.groupName = groupName
        this.uuid = uuidv4()
    }

    addContact(value: IContact) {
        this.contactList.push(value)
    }

    removeContact(contactToRemove: IContact) {
        if (!this.contactList.includes(contactToRemove)) throw Error("Contact doesn't exists.")
        const indexOfSearchingElement = this.contactList.findIndex(el => {
            el.uuid === contactToRemove.uuid
        })
        this.contactList.splice(indexOfSearchingElement, 1)
    }

    changeGroupName(newGroupName: string) {
        stringValidation(newGroupName)
        this.groupName = newGroupName
    }



    isInGroup(secondName:string) {
        stringValidation(secondName)

        const contactValues = this.contactList.map(contact => {
            return Object.values(contact)
        });

        const isInValues = contactValues.some((values, i, arr) => {

            return values.some(value => {
                return value === secondName
            })
        })

        //ponowne wytłumaczenie działania metody

        return isInValues
    }
};

export default Group