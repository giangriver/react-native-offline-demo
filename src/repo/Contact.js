import Realm from "realm";

class ContactSchema extends Realm.Object {}
ContactSchema = {
    name: 'Contact',
    properties: {
        _id: 'string?',
        status: "string",
        name: 'string',
        number: 'string',
        email: "string",
        photo: "string?",
        created_date: "string?",
        updated_date: "string?",
        deleted_date: "string?"
    }
}

export default ContactSchema