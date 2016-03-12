"use strict";
require("bootstrap");
function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    aurelia.start().then(a => a.setRoot());
}
exports.configure = configure;
//# sourceMappingURL=main.js.map