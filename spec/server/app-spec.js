"use strict";
var app_1 = require("../../src/app");
describe("greeter", function () {
    it("should greet with message", function () {
        var greeter = new app_1.Greeter("Hello,");
        expect(greeter.greet("friend")).toBe("Hello, friend");
    });
});
//# sourceMappingURL=app-spec.js.map