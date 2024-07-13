import {Router} from "express";
import {verifyToken} from "../middelware/verifyToken";

const router = Router();

router.get("/", verifyToken, (req, res) => {
    res.json({message: "Protected route"});
});

export default router;