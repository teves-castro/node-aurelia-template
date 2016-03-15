export interface ITodo {
    description: string;
    complete: boolean;
}
export class Todo {
    _id: string;
    description: string;
    complete: boolean;

    private clone() {
        return JSON.parse(JSON.stringify(this)) as Todo;
    }

    getUpdateObject() {
        var clone = this.clone();
        delete clone._id;
        return clone as ITodo;
    }
}