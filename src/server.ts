import * as express from "express"

var app = express();
app.use(express.static(__dirname + "/client"));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
