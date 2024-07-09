import express, { Express, Request, Response } from "express";
import router from "./routes/auth.route";

const app: Express = express();

app.use(router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World Server!");
});

app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:3000}`);
});