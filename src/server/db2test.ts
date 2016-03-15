import {Router, Express} from "express"
import * as ibmdb from "ibm_db"

export class Db2Service {

    static getRouter() {

        var router = Router();

        let cs = "DRIVER={DB2};DATABASE=S067C676;HOSTNAME=10.217.80.4;UID=vcastro;PWD=ortsac;PORT=446;PROTOCOL=TCPIP";
        router
            .route("/api/dummy")
            .get((req, res) => {
                ibmdb.open("", (err, conn) => {
                    if (err) return console.log(err);

                    conn.query('select 1 from sysibm.sysdummy1', (err, data) => {
                        if (err) console.log(err);
                        else console.log(data);

                        conn.close(() => {
                            console.log('done');
                        });
                    });
                });
            });

        return router;
    }
}