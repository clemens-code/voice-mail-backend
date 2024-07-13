import {Router} from "express";
import admin from "firebase-admin";

const router = Router();

router.post('/', async (req, res) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({error: 'No token provided'});
    }
    try {
        await admin.auth().verifyIdToken(token);
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
        });
        res.status(200).json({message: 'Logged in successfully'});
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({error: 'Invalid token'});
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({message: 'Logged out successfully'});
});

export default router;
