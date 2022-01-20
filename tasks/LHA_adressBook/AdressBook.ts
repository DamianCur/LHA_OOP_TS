import { IContact, IGroup } from "./types"



type availableKeys = "name" | "surname" | "email" | "modificateDate";

class AddressBook {

    contactList: IContact[]
    groupList: IGroup[]

    constructor() {
        this.contactList = []
        this.groupList = []
    }

    addContactToList(newContact: IContact) {

        const contactIndex = this.contactList.findIndex(contact => contact.uuid === newContact.uuid)
        //stworzyc funkcje do utility

        if (contactIndex !== -1) throw Error("Contact already exists")

        this.contactList.push(newContact)
    }

    addGroupToList(newGroup: IGroup) {

        const groupIndex = this.groupList.findIndex(group => group.uuid === newGroup.uuid)

        if (groupIndex !== -1) throw Error("Group already exists")

        this.groupList.push(newGroup)
    }

    removeContactFromList(contactToRemove: IContact) {

        const contactIndex = this.contactList.findIndex(contact => contact.uuid === contactToRemove.uuid)
        if (contactIndex === -1) throw Error("Given contact doesnt exists")

        this.contactList.splice(contactIndex, 1)
    }

    removeGroupFromList(groupToRemove: IGroup) {

        const groupIndex = this.groupList.findIndex(group => group.uuid === groupToRemove.uuid)

        if (groupIndex === -1) throw Error("This group doesn't exists.")

        this.groupList.splice(groupIndex, 1)
    }

    changeContactData(contact: IContact, key: availableKeys, value: string) {


        const checkContactInArray = this.contactList.findIndex((arrContact) => {
            arrContact.uuid === contact.uuid
        })

        if (checkContactInArray === -1) {
            throw Error("Contact not find.")
        }

        const index = this.contactList.findIndex((el) => el.uuid === contact.uuid)

        this.contactList[index].changeData(key, value);
    }

    findContacts(searchingContact: IContact) {
        const foundContacts = this.contactList.filter(contact => {
            return contact.uuid === searchingContact.uuid
        })

        return foundContacts
    }
}

export default AddressBook