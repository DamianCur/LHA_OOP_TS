interface IContact {
    name: string;
    surname: string;
    email: string;
    modificateDate: string;
    createdDate: string;
    uuid: string;
    changeName(value: string): void;
    changeSurename(value: string): void;
    changeEmail(value: string): void;
    changeData(key: "name" | "surname" | "email" | "modificateDate", value: string): void
}

interface IGroup {
    contactList: IContact[]
    groupName: string;
    uuid: string
    addContact(value: IContact): void
    removeContact(contactToRemove: IContact): void
    changeGroupName(newGroupName: string): void
    isInGroup(secondName: string): boolean
    }


export {IContact, IGroup}