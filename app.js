const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {verify} = require("./token_utils")
const {imageUpload} = require("./server/upload")
const {login} = require("./server/login")
const {register} = require("./server/register")
const productApi = require("./server/product")

const port = 3030;
const host = "localhost";

const router = (app) => {
    imageUpload(app)

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
        let result = await productApi.read(req.query)
        res.send(result);
    })
    app.post("/api/product", async(req, res) => {
        try {
            await verify(req.cookies.token)
        }
        catch(e) {
            return res.send({error: "Access denied"})
        }

        const result = await productApi.create(req.body);
        return res.send(result);
    })
    app.put("/api/product", async(req, res) => {
        try {
            await verify(req.cookies.token)
        }
        catch(e) {
            return res.send({error: "Access denied"})
        }

        const result = await productApi.update(req.body);
        res.send(result);

    })
    app.delete("/api/product", async(req, res) => {
        try {
            await verify(req.cookies.token)
        }
        catch(e) {
            return res.send({error: "Access denied"})
        }

        const result = await productApi.remove(req.query);
        res.send(result);
    })

    app.get("*", (req, res) => {
        const indexFilePath =path.join(__dirname, 'client/build/index.html');
        res.sendFile(indexFilePath)
    });
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
