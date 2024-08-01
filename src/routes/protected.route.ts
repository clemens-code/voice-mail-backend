import {Router} from "express";
import {handleAuth} from "../middelware/handleAuth";

const router = Router();

router.get("/", handleAuth, (req, res) => {
    res.json({message: "Protected route"});
});

export default router;