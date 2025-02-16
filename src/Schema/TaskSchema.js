import Realm from "realm";

class TaskSchema extends Realm.Object { }
TaskSchema.schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', indexed: true },
        taskDescription: 'string',
        isComplete: 'bool'
    }
};

export default TaskSchema;