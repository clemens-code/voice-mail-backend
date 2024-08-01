import dotenv from 'dotenv';

dotenv.config({path: '.env.development'});

import express, {Express} from "express";
import audioRoute from "./routes/audio.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import protectedRoute from "./routes/protected.route";
import bodyParser from 'body-parser';
import {initConnection} from "./repository/audioRecord.repo";
import {handleAuth} from "./middelware/handleAuth";
import authRoute from "./routes/auth.route";
import {verifier} from "./services/verifyToken.service";

const app: Express = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/audio", handleAuth, audioRoute);
app.use("/protected", protectedRoute);
app.use("/auth", authRoute)

verifier.hydrate()
    .catch((err) => {
        console.error(`Failed to hydrate JWT verifier: ${err}`);
        process.exit(1);
    }).then(() => {
    app.listen(8080, async () => {
        console.log(`[server]: Server is running at http://localhost:8080}`);
        await initConnection();
    });
});

