import {Router} from "express";
import upload from "../services/storage.service";
import {verifyToken} from "../middelware/verifyToken";

const router = Router();

router.post("/upload", verifyToken, upload.single('audio'), (req, res, next) => {
    res.json({message: "File uploaded successfully"});
});

export default router;
