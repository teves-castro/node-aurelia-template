"use strict";
var express = require("express");
var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function (name) {
        return this.greeting + " " + name;
    };
    return Greeter;
}());
exports.Greeter = Greeter;
var app = express();
app.use(express.static(__dirname + "/client"));
console.log("files: " + __dirname + "/client");
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
var greeter = new Greeter("Hello");
console.log(greeter.greet("Cristina"));
//# sourceMappingURL=app.js.map