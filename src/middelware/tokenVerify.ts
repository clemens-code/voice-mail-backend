import express from "express";
import admin from "firebase-admin";

export const verifyToken = async (req: express.Request, next: express.NextFunction) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        throw Error("No token present!");
    }
    try {
        (req as any).user = await admin.auth().verifyIdToken(token);
        next();
    } catch (error) {
        throw Error("Verification of token failed.");
    }
}
