import Realm from "realm";

// Declare Schema
class AccountSchema extends Realm.Object {}
AccountSchema = {
    name: 'Account',
    properties: {
        username: {type: 'string', default: "user"},
        password:  'string'
    }
};

// Create realm
let realm = new Realm({path:'UserDatabase.realm', schema: [AccountSchema]});

// Export the realm
export default realm;