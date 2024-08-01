import { DecodedIdToken } from 'firebase-admin/auth';
import {Request} from 'express'

declare global {
    namespace Express {
        interface Request {
           username: string;
           userId: string;
        }
    }
}

export {};