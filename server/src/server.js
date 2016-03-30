"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const todo_1 = require("./modules/todo");
var cors = require("express-cors");
var app = express();
app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    allowedOrigins: [
        'localhost:3000'
    ]
}));
var todoRouter = todo_1.TodoService.getRouter();
app.use("/api", todoRouter);
app.listen(5000, function () {
    console.log('Todos listening on port 5000!');
});
//# sourceMappingURL=server.js.map