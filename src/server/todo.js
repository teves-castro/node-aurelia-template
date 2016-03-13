"use strict";
class TodoService {
    constructor() {
        this.todos = [
            { description: "Do this", complete: false },
            { description: "Do that", complete: true }
        ];
    }
    registerRoutes(app) {
        app.get("/api/todos", (req, res) => {
            try {
                res.json(this.todos);
            }
            catch (error) {
                res.json({ info: "error during get.", error: error });
            }
        });
        app.post("/api/todos", (req, res) => {
            try {
                let todo = req.body;
                this.todos.push(todo);
                res.json({ info: "ok." });
            }
            catch (error) {
                res.json({ info: "error during todo create.", error: error });
            }
        });
        app.put("/api/todos", (req, res) => {
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
    }
}
exports.TodoService = TodoService;
//# sourceMappingURL=todo.js.map