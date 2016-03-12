import {Express} from "express"
import {Todo} from "../models/todo"

export class TodoService {
    todos: Todo[] = [
        { description: "Do this", complete: false },
        { description: "Do that", complete: true }
    ];

    registerRoutes(app: Express) {

        /* Read */
        app.get("/api/todos", (req, res) => {
            try {
                res.json(this.todos);
            } catch (error) {
                res.json({ info: "error during get.", error: error });
            }
        });

        /* Create */
        app.post("/api/todos", (req, res) => {
            try {
                let todo = req.body as Todo;
                this.todos.push(todo);
            } catch (error) {
                res.json({ info: "error during todo create.", error: error });
            }
        });
    }
}