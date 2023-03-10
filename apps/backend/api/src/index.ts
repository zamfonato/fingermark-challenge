import express, { Express, Request, Response } from "express";
import cors from 'cors';
import { kioskRoutes } from "./routes/kiosk";
import { initJobs } from "./jobs/scheduled-tasks";
import { connectDatabase } from "./utils/Db";
import { populateCache } from "./cache/Cahce";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// establish database connection
connectDatabase();

app.use(cors())

app.use(express.json());

app.use("/kiosk", kioskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

initJobs();
populateCache();
