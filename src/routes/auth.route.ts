import {Router} from "express";
import {handleAuth} from "../middelware/handleAuth";
import {verifyToken} from "../services/verifyToken.service";

const router = Router();

router.get('/login', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token)
    if (!token) {
        return res.status(400).json({error: 'No token provided'});
    }
    verifyToken(token)
        .catch((error) => {
            console.error('Error verifying token:', error);
            return res.status(401).json({message: 'Invalid token'});
        })
        .then(() => {
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure in production
                sameSite: 'strict',
                maxAge: 3600000, // 1 hour
            });
            return res.status(200).json({message: 'Logged in successfully'});
        });
});

router.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json({message: 'Logged out successfully'});
});

export default router;