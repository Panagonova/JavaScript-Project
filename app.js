const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {login} = require("./server/login")
const {register} = require("./server/register")

const port = 3030;
const host = "localhost";

const router = (app) => {
    app.post("/api/login", async(req, res) => {
        const result = await login(req.body)
        if (!result.error)
            res.cookie("token", result.token, { path: '/' })
        return res.send(result)
    })

    app.post("/api/logout", async(req, res) => {
        res.cookie("token", "", { path: '/' })
        return res.send({success: true})
    })

    app.post("/api/register", async(req, res) => {
        const result = await register(req.body);
        if (!result.error)
            res.cookie("token", result.token, { path: '/' })
        return res.send(result)

    })
}

(async() => {
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/src"));

    router(app)

    app.listen(port, () => {
        console.info(`Server is READY!!! - http://${host}${port ? ":" + port : ""}`);
    });
})()
