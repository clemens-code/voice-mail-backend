import express, {Express} from "express";
import './lib/auth'
import audioRoute from "./routes/audio.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route";
import protectedRoute from "./routes/protected.route";

const app: Express = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/audio", audioRoute);
app.use("/auth", authRoute);
app.use("/protected", protectedRoute);

app.listen(8080, () => {
    console.log(`[server]: Server is running at http://localhost:8080}`);
});