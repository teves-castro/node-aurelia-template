import {Greeter} from "../../src/server/app";

describe("greeter", () => {
    it("should greet with message", () => {
        var greeter = new Greeter("Hello,");
        expect(greeter.greet("friend")).toBe("Hello, friend");
    });
});
