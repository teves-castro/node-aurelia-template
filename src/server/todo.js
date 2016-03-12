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
            }
            catch (error) {
                res.json({ info: "error during todo create.", error: error });
            }
        });
    }
}
exports.TodoService = TodoService;
//# sourceMappingURL=todo.js.map