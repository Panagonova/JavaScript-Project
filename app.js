const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 3030;
const host = "localhost";

const router = (app) => {
    app.get("/api/login", async(req, res) => {

    })

    app.post("/api/logout", async(req, res) => {

    })

    app.post("/api/register", async(req, res) => {

    })
}

(async() => {
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json({limit: "10mb"}));
    app.use(bodyParser.urlencoded({extended: true, limit: "10mb"}));
    app.use(express.static(__dirname + "/src"));

    router(app)

    app.listen(port, () => {
        console.info(`Server is READY!!! - http://${host}${port ? ":" + port : ""}`);
    });
})()
