import Realm from "realm";
import TaskSchema from "../Schema/TaskSchema";

export default function getRealm(){
    return Realm.open({
        schema: [TaskSchema], 
    })
}