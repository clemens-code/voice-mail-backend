import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
    email: string;
    username: string;
}


export const handleAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers)
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, "secret", (error, decoded) => {
            if (error || !decoded) {
                return res.sendStatus(403);
            }

            const decodedToken = decoded as DecodedToken;
            req.username = decodedToken.username;
            req.email = decodedToken.email;
            req.userId = decodedToken.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};