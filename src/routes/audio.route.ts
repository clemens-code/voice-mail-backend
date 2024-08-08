import {Router} from "express";
import upload from "../services/storage.service";
import {AudioRecordModel} from "../model/audioRecord.model";
import {createNewRecord} from "../repository/audioRecord.repo";

const router = Router();

router.post("/upload", upload.single('audio'), (req, res, next) => {
    console.log(req.username);
    res.json({message: "File uploaded successfully"});
});

router.post("/upload", upload.single('audio'), async (req, res, next) => {
    console.log(req.username);
    console.log(req.filePath)
    const body: Partial<AudioRecordModel> = req.body;
    if (!body.avatarProps || !body.bgColor || !body.title || !body.description || !body.title || !body.length || !body.recordedAt || !req.filePath) {
        console.log(body.avatarProps)
        console.log("error");
        console.log(body);
        res.status(400).json({error: "Invalid request body"});
        return;
    }
    const audioRecord = body as AudioRecordModel;
    audioRecord.audioUrl = req.filePath;
    const id = await createNewRecord(body as AudioRecordModel);
    console.log(id);
    return res.status(200).json({message: id});
})

export default router;
