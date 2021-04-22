import Realm from "realm";

class ContactSchema extends Realm.Object {}
ContactSchema = {
    name: 'Contact',
    properties: {
        id: 'int',
        name: 'string',
        avatar: "string",
        phone: "string",
        email: "string"
    }
}

export default ContactSchema