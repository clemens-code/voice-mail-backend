import express, {Express} from "express";
import audioRoute from "./routes/audio.route";

const app: Express = express();

app.use("/audio", audioRoute);

app.listen(8080, () => {
    console.log(`[server]: Server is running at http://localhost:3000}`);
});