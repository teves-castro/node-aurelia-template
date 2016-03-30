import * as express from "express";
import * as bodyParser from "body-parser";
import {TodoService} from "./modules/todo";
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

var todoRouter = TodoService.getRouter();

app.use("/api", todoRouter);

app.listen(5000, function() {
    console.log('Todos listening on port 5000!');
});
