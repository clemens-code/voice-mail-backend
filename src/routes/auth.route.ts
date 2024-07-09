import express, {Express, Router} from "express";
import {verifyToken} from "../middelware/tokenVerify";

const app: Express = express();
const router = Router();

router.get("/", verifyToken, (req, res) => {
    res.json({message: 'Access Granted', user: (req as any).user})
})

export default router;