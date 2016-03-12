import * as express from "express"
import * as bodyParser from "body-parser"
import {TodoService} from "./server/todo"

var app = express();

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var service = new TodoService();
service.registerRoutes(app);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
