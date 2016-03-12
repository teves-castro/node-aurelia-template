import * as express from "express"

/**
 * Greeter
 */
export class Greeter {
    constructor(private greeting: string) { }

    greet(name: string) {
        return this.greeting + " " + name;
    }
}

var app = express();
app.use(express.static(__dirname + "/client"));
console.log("files: " + __dirname + "/client");

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

var greeter = new Greeter("Hello");
console.log(greeter.greet("Cristina"));

