import {Router, Express} from "express"
import {Todo, ITodo} from "../models/todo"
import {MongoClient, Db, ObjectID} from "mongodb"
// import * as ibmdb from "ibm_db"

const dbUrl = "mongodb://localhost:27017/todos";

export class TodoService {
    private static todos: ITodo[] = [
        { description: "Do this", complete: false },
        { description: "Do that", complete: true }
    ];

    private static async connect(url: string) {
        let db: Db;
        try {
            db = await MongoClient.connect(url);
            return db;
        } catch (error) {
            if (db) db.close();
        }
    }


    static getRouter() {

        var router = Router();

        /* Save all */
        router
            .route("/todos/saveall")
            .get(async (req, res) => {
                try {
                    let db = await TodoService.connect(dbUrl);
                    let collection = db.collection('todos');
                    let result = await collection.insertMany(this.todos);
                    res.json({ info: "successfully writen all todos.", result: result });
                    await db.close();
                } catch (error) {
                    res.json({ info: "error during saveall.", error: error });
                }
            });

        /* Read */
        router
            .route("/todos")
            .get(async (req, res) => {
                try {
                    let db = await TodoService.connect(dbUrl);
                    let collection = db.collection('todos');
                    let todos: Todo[] = await collection.find({}).toArray();
                    res.json(todos);
                    await db.close();
                } catch (error) {
                    res.json({ info: "error during get.", error: error });
                }
            });

        /* Create */
        router
            .route("/todos")
            .post(async (req, res) => {
                try {
                    let db = await TodoService.connect(dbUrl);
                    let collection = db.collection('todos');
                    let todo = req.body as Todo;
                    let result = await collection.insertOne(todo);
                    res.json({ info: "ok.", result: result });
                    await db.close();
                } catch (error) {
                    res.json({ info: "error during todo create.", error: error });
                }
            });

        /* Modify */
        router
            .route("/todos")
            .put(async (req, res) => {
                try {
                    let db = await TodoService.connect(dbUrl);
                    let collection = db.collection('todos');
                    let todo = req.body as Todo;
                    let result = await collection.updateOne({ _id: new ObjectID(todo._id) }, todo.getUpdateObject());
                    res.json({ info: "ok.", result: result });
                    await db.close();
                } catch (error) {
                    res.json({ info: "error during todo modify.", error: error });
                }
            });

        /* Modify */
        router
            .route("/todos/setcomplete")
            .put(async (req, res) => {
                try {
                    let db = await TodoService.connect(dbUrl);
                    let collection = db.collection('todos');
                    let todo = req.body as Todo;
                    let result = await collection.findOneAndUpdate({ _id: new ObjectID(todo._id) }, { $set: { complete: todo.complete } });

                    res.json({ info: "ok.", result: result });
                    await db.close();
                } catch (error) {
                    res.json({ info: "error during todo modify.", error: error });
                }
            });

        /* Delete */
        router
            .route("/todos/:id")
            .delete(async (req, res) => {
                try {
                    let db = await TodoService.connect(dbUrl);
                    let collection = db.collection('todos');
                    let result = await collection.deleteOne({ _id: new ObjectID(req.params.id) });

                    res.json({ info: "todo deleted successfully" });
                    await db.close();
                } catch (error) {
                    res.json({ info: "error during delete.", error: error });
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