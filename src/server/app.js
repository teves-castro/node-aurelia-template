"use strict";
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
var greeter = new Greeter("Hello");
console.log(greeter.greet("Cristina"));
console.log('Ending...');
console.log('Realy ending now!');
//# sourceMappingURL=app.js.map