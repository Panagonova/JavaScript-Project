const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {verify} = require("../token_utils")
const {login} = require("./server/login")
const {register} = require("./server/register")
const productApi = require("./server/product")

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

    app.get("/api/product", async(req, res) => {
        return await productApi.read(res.query)
    })
    app.post("/api/product", async(req, res) => {
        if (!await verify(req.cookies.token))
            return {error: "Access denied"}

        return await productApi.create(res.body)
    })
    app.put("/api/product", async(req, res) => {
        if (!await verify(req.cookies.token))
            return {error: "Access denied"}

        return await productApi.update(res.body)
    })
    app.delete("/api/product", async(req, res) => {
        if (!await verify(req.cookies.token))
            return {error: "Access denied"}

        return await productApi.remove(res.body)
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
