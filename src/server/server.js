"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const todo_1 = require("./modules/todo");
var app = express();
app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var todoRouter = todo_1.TodoService.getRouter();
app.use("/api", todoRouter);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=server.js.map