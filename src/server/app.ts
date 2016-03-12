/**
 * Greeter
 */
export class Greeter {
    constructor(private greeting: string) { }

    greet(name: string) {
        return this.greeting + " " + name;
    }
}

var greeter = new Greeter("Hello");
console.log(greeter.greet("Cristina"));

console.log('Ending...');

console.log('Realy ending now!');
