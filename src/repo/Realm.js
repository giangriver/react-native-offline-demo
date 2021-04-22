import Realm from "realm";
import ContactSchema from "./Contact"
import AccountSchema from './Account'

// Declare Schema

// Create realm
let realm = new Realm({path:'UserDatabase.realm', schema: [AccountSchema, ContactSchema]});

// Export the realm
export default realm;