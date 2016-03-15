import {Router, Express} from "express"
import {Todo} from "../models/todo"
// import * as ibmdb from "ibm_db"

export class TodoService {
    private static todos: Todo[] = [
        { description: "Do this", complete: false },
        { description: "Do that", complete: true }
    ];

    static getRouter() {

        var router = Router();

        /* Read */
        router
            .route("/todos")
            .get((req, res) => {
                try {
                    res.json(this.todos);
                } catch (error) {
                    res.json({ info: "error during get.", error: error });
                }
            });

        /* Create */
        router
            .route("/todos")
            .post((req, res) => {
                try {
                    let todo = req.body as Todo;
                    this.todos.push(todo);
                    res.json({ info: "ok." });
                } catch (error) {
                    res.json({ info: "error during todo create.", error: error });
                }
            });

        /* Modify */
        router
            .route("/todos")
            .put((req, res) => {
                try {
                    let todo = req.body as Todo;

                    let todos = this.todos;
                    var index = todos.findIndex(t => t.description === todo.description);
                    todos[index] = todo;
                    res.json({ info: "ok." });
                } catch (error) {
                    res.json({ info: "error during todo modify.", error: error });
                }
            });

        // let cs = "DRIVER={DB2};DATABASE=S067C676;HOSTNAME=10.217.80.4;UID=vcastro;PWD=ortsac;PORT=446;PROTOCOL=TCPIP";

        // app.get("/api/dummy", (req, res) => {
        //     ibmdb.open("", (err, conn) => {
        //         if (err) return console.log(err);

        //         conn.query('select 1 from sysibm.sysdummy1', (err, data) => {
        //             if (err) console.log(err);
        //             else console.log(data);

        //             conn.close(() => {
        //                 console.log('done');
        //             });
        //         });
        //     });
        // });

        return router;
    }
}