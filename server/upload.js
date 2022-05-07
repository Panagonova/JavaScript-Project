const fs = require("fs");
const path = require("path");
let multer = require('multer');
let {nanoid} = require('nanoid');

const fileUpload = (app) =>{
    let upload_dir = path.normalize(`${__dirname}/_uploads/`);
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

    app.post("/api/upload", multer({storage: storage}).single('file'), async(req, res) => {
        fs.copyFileSync(req.file.path, `${__dirname}/../src/images/${req.file.filename}`)
        fs.unlinkSync(req.file.path);
        res.send(req.file);
    })
};

module.exports = {
    fileUpload
}
