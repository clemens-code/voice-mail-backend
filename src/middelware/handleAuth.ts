import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../services/verifyToken.service";


export const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies.accessToken);
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }
    try {
        const payload = await verifyToken(token);
        console.log(payload);
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({message: 'Invalid token'});
    }
};