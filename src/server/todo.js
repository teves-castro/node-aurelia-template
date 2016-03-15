"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const dbUrl = "mongodb://localhost:27017/todos";
class TodoService {
    static connect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield mongodb_1.MongoClient.connect(url);
                return db;
            }
            catch (error) {
                if (db)
                    db.close();
            }
        });
    }
    static getRouter() {
        var router = express_1.Router();
        router
            .route("/todos/saveall")
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let db = yield TodoService.connect(dbUrl);
                let collection = db.collection('todos');
                let result = yield collection.insertMany(this.todos);
                res.json({ info: "successfully writen all todos.", result: result });
                yield db.close();
            }
            catch (error) {
                res.json({ info: "error during saveall.", error: error });
            }
        }));
        router
            .route("/todos")
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let db = yield TodoService.connect(dbUrl);
                let collection = db.collection('todos');
                let todos = yield collection.find({}).toArray();
                res.json(todos);
                yield db.close();
            }
            catch (error) {
                res.json({ info: "error during get.", error: error });
            }
        }));
        router
            .route("/todos")
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let db = yield TodoService.connect(dbUrl);
                let collection = db.collection('todos');
                let todo = req.body;
                let result = yield collection.insertOne(todo);
                res.json({ info: "ok.", result: result });
                yield db.close();
            }
            catch (error) {
                res.json({ info: "error during todo create.", error: error });
            }
        }));
        router
            .route("/todos")
            .put((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let db = yield TodoService.connect(dbUrl);
                let collection = db.collection('todos');
                let todo = req.body;
                let result = yield collection.updateOne({ _id: new mongodb_1.ObjectID(todo._id) }, todo.getUpdateObject());
                res.json({ info: "ok.", result: result });
                yield db.close();
            }
            catch (error) {
                res.json({ info: "error during todo modify.", error: error });
            }
        }));
        router
            .route("/todos/setcomplete")
            .put((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let db = yield TodoService.connect(dbUrl);
                let collection = db.collection('todos');
                let todo = req.body;
                let result = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectID(todo._id) }, { $set: { complete: todo.complete } });
                res.json({ info: "ok.", result: result });
                yield db.close();
            }
            catch (error) {
                res.json({ info: "error during todo modify.", error: error });
            }
        }));
        router
            .route("/todos/:id")
            .delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let db = yield TodoService.connect(dbUrl);
                let collection = db.collection('todos');
                let result = yield collection.deleteOne({ _id: new mongodb_1.ObjectID(req.params.id) });
                res.json({ info: "todo deleted successfully" });
                yield db.close();
            }
            catch (error) {
                res.json({ info: "error during delete.", error: error });
            }
        }));
        return router;
    }
}
TodoService.todos = [
    { description: "Do this", complete: false },
    { description: "Do that", complete: true }
];
exports.TodoService = TodoService;
//# sourceMappingURL=todo.js.map