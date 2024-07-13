import admin from "firebase-admin";
import {NextFunction, Request, Response} from "express";


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        req.user = await admin.auth().verifyIdToken(token);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};