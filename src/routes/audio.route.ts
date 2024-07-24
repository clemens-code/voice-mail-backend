import {Router} from "express";
import upload from "../services/storage.service";
import {verifyToken} from "../middelware/verifyToken";
import {AudioRecordModel} from "../model/audioRecord.model";
import {createNewRecord, tryConnection} from "../repository/audioRecord.repo";

const router = Router();

router.post("/upload", verifyToken, upload.single('audio'), (req, res, next) => {
    res.json({message: "File uploaded successfully"});
});

//TODO verifyToken middleware should be added to this route
router.post("/upload/card", async (req, res, next) => {
    const body: Partial<AudioRecordModel> = req.body;
    await tryConnection();
    if (!body.avatarProps || !body.bgColor || !body.title || !body.description || !body.userName) {
        res.status(400).json({error: "Invalid request body"});
        return;
    }
    const t = await createNewRecord(body as AudioRecordModel);
    console.log(t);
    return res.status(200).json({message: t});
})

export default router;
