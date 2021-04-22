import Realm from "realm";

class AccountSchema extends Realm.Object {}
AccountSchema = {
    name: 'Account',
    properties: {
        username: {type: 'string', default: "user"},
        password:  'string',
        access_token: 'string',
    }
}

export default AccountSchema