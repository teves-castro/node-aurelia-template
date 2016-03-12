"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const todo_1 = require("./server/todo");
var app = express();
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var service = new todo_1.TodoService();
service.registerRoutes(app);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=server.js.map