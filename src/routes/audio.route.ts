import {Router} from "express";
import upload from "../services/storage.service";
import {AudioRecordModel} from "../model/audioRecord.model";
import {createNewRecord} from "../repository/audioRecord.repo";

const router = Router();

router.post("/upload", upload.single('audio'), (req, res, next) => {
    console.log(req.username);
    res.json({message: "File uploaded successfully"});
});

router.post("/upload/card", async (req, res, next) => {
    console.log(req.username);
    const body: Partial<AudioRecordModel> = req.body;
    //await tryConnection();
    if (!body.avatarProps || !body.bgColor || !body.title || !body.description || !body.userName) {
        console.log(body.avatarProps)
        console.log("error");
        console.log(body);
        res.status(400).json({error: "Invalid request body"});
        return;
    }
    const t = await createNewRecord(body as AudioRecordModel);
    console.log(t);
    return res.status(200).json({message: t});
})

export default router;
