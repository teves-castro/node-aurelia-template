"use strict";
const express_1 = require("express");
class TodoService {
    static getRouter() {
        var router = express_1.Router();
        router
            .route("/todos")
            .get((req, res) => {
            try {
                res.json(this.todos);
            }
            catch (error) {
                res.json({ info: "error during get.", error: error });
            }
        });
        router
            .route("/todos")
            .post((req, res) => {
            try {
                let todo = req.body;
                this.todos.push(todo);
                res.json({ info: "ok." });
            }
            catch (error) {
                res.json({ info: "error during todo create.", error: error });
            }
        });
        router
            .route("/todos")
            .put((req, res) => {
            try {
                let todo = req.body;
                let todos = this.todos;
                var index = todos.findIndex(t => t.description === todo.description);
                todos[index] = todo;
                res.json({ info: "ok." });
            }
            catch (error) {
                res.json({ info: "error during todo modify.", error: error });
            }
        });
        return router;
    }
}
TodoService.todos = [
    { description: "Do this", complete: false },
    { description: "Do that", complete: true }
];
exports.TodoService = TodoService;
//# sourceMappingURL=todo.js.map