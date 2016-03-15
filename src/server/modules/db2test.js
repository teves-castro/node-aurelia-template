"use strict";
const express_1 = require("express");
const ibmdb = require("ibm_db");
class Db2Service {
    static getRouter() {
        var router = express_1.Router();
        let cs = "DRIVER={DB2};DATABASE=S067C676;HOSTNAME=10.217.80.4;UID=vcastro;PWD=ortsac;PORT=446;PROTOCOL=TCPIP";
        router
            .route("/api/dummy")
            .get((req, res) => {
            ibmdb.open("", (err, conn) => {
                if (err)
                    return console.log(err);
                conn.query('select 1 from sysibm.sysdummy1', (err, data) => {
                    if (err)
                        console.log(err);
                    else
                        console.log(data);
                    conn.close(() => {
                        console.log('done');
                    });
                });
            });
        });
        return router;
    }
}
exports.Db2Service = Db2Service;
//# sourceMappingURL=db2test.js.map