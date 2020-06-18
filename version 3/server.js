import handler from "./handler.js";
import express from "express";

const port = 8080;
const app = express();

/* app.use(session({
    "secret": "1212121212121212121"
})); */

app.use("/", express.static("app"));
app.use("/", express.json());

app.post("/", function (req, res) {
    const responseObj = req.body;
    // handle a promise - asynchronous coding
    handler(responseObj).then(function (responseObj) {
        res.json(responseObj); // optimised

        //res.setHeader("Content-Type", "application/json");
        //res.end(JSON.stringify(responseObj));
    });
});

app.listen(port, function () {
    console.log("listening on port" + port);
});
