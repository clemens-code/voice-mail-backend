import multer from "multer";
import * as fs from "fs";

const dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dir)
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({
    storage: storage
});

export default upload;