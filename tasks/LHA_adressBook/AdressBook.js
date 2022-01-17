import Contact from './Contact.js'
import Group from './Group.js'

class AddressBook {
    constructor() {
        this.contactList = []
        this.groupList = []
    }

    addContactToList(newContact) {
        if (!newContact instanceof Contact) throw Error("New contact isn't a valid contact.")

        const contactIndex = this.contactList.findIndex(contact => contact.uuid === newContact.uuid)

        if (contactIndex !== -1) throw Error("Contact already exists")

        this.contactList.push(newContact)
    }
    addGroupToList(newGroup) {
        if (!newGroup instanceof Group) throw Error("This group is not valid.")

        const groupIndex = this.groupList.findIndex(group => group.uuid === newGroup.uuid)

        if (groupIndex !== -1) throw Error("Group already exists")

        this.groupList.push(newGroup)
    }

    removeContactFromList(contactToRemove) {
        if (!contactToRemove instanceof Contact) throw Error("This contact is not valid.")

        const contactIndex = this.contactList.findIndex(contact => contact.uuid === contactToRemove.uuid)
        if (contactIndex === -1) throw Error("Given contact doesnt exists")

        this.contactList.splice(contactIndex, 1)
    }

    removeGroupFromList(groupToRemove) {
        if (!groupToRemove instanceof Group) throw Error("This group is not valid.")

        const groupIndex = this.groupList.findIndex(group => group.uuid === groupToRemove.uuidIndex === -1)

        if (groupIndex === -1) throw Error("This group doesn't exists.")

        this.groupList.splice(groupToRemove)
    }

    changeContactData(contact, key, value) {
        if (!contact instanceof Contact) throw Error("This contact doesn't exists.")
        if (!this.contactList.includes(contact)) throw Error("Contact not find.")

        const index = this.contactList.findIndex((el) => el.uuid === contact.uuid)

        this.contactList[index].changeData(key, value);
    }

    findContacts(searchingContact) {
        const foundContacts = this.contactList.filter(contact => {
            return contact.uuid === searchingContact.uuid
        })

        return foundContacts
    }
}

export default AddressBook