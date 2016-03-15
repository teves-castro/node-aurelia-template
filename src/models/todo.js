"use strict";
class Todo {
    clone() {
        return JSON.parse(JSON.stringify(this));
    }
    getUpdateObject() {
        var clone = this.clone();
        delete clone._id;
        return clone;
    }
}
exports.Todo = Todo;
//# sourceMappingURL=todo.js.map