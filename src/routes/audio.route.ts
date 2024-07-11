import {Router} from "express";
import upload from "../services/storage.service";

const router = Router();

router.post("/upload", upload.single('audio'), (req, res) => {
    res.json({message: "File uploaded successfully"});
});

export default router;