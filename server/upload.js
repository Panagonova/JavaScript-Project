const fs = require("fs");
const path = require("path");
let multer = require('multer');
let {nanoid} = require('nanoid');

const imageUpload = (app) =>{
    let upload_dir = path.normalize(`${__dirname}/../src/images/`);
    if (!fs.existsSync(upload_dir))
        fs.mkdirSync(upload_dir, {recursive: true});

    let storage =  multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, upload_dir)
        },
        filename: function (req, file, cb) {
            let name = nanoid(16) + "."  + file.originalname.split(".").pop();
            cb(null, name )
        }
    });

    app.post("/api/upload/image", multer({storage: storage}).single('file'), async(req, res) => {
        res.send(req.file);
    })
};

module.exports = {
    imageUpload
}
