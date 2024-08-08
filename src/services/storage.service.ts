import multer from "multer";
import * as fs from "fs";

const baseDir = './uploads';

if (!fs.existsSync(baseDir)){
    fs.mkdirSync(baseDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const userId = req.userId;
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
        const filename = file.fieldname + '-' + Date.now();
        req.filePath = `${baseDir}/${req.userId}/${filename}`;
        callback(null, filename)
    }
});

const upload = multer({
    storage: storage
});

export default upload;