import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { makananRouter } from "./routes";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(`${process.env.PORT}`) || 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const options: cors.CorsOptions = {
  origin: "*",
};

app.use(cors(options));
app.use(express.json());

app.use("/api/makanan", makananRouter);
export default app;