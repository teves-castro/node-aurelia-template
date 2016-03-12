"use strict";
const server_1 = require("../../src/server");
describe("greeter", () => {
    it("should greet with message", () => {
        var greeter = new server_1.Greeter("Hello,");
        expect(greeter.greet("friend")).toBe("Hello, friend");
    });
});
//# sourceMappingURL=server-spec.js.map