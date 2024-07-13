import multer from "multer";
import * as fs from "fs";

const baseDir = './uploads';

if (!fs.existsSync(baseDir)){
    fs.mkdirSync(baseDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const userId = req.user?.uid;
        if (!userId) {
            return callback(new Error('User ID not found'), baseDir);
        }
        const userDir = `${baseDir}/${userId}`;
        if (!fs.existsSync(userDir)){
            fs.mkdirSync(userDir, { recursive: true });
        }
        callback(null, userDir);
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({
    storage: storage
});

export default upload;