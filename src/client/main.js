"use strict";
function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    aurelia.start().then(a => a.setRoot("pages/app"));
}
exports.configure = configure;
//# sourceMappingURL=main.js.map