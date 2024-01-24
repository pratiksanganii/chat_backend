import { config } from "dotenv";
import { connectDB } from "./database/db";
import express, { Express, Request, Response } from "express";
import { login, signUp } from "./controller/userController";
import { verifyToken } from "./middleware/authMiddleware";
config();
const app: Express = express();
const PORT = process.env.PORT || 4000;

async function startApp() {
  await connectDB();
  app.get("/", (req: Request, res: Response) => {
    res.json("Hello world!");
  });
  app.post("/login", login);
  app.post("/signup", signUp);

  // authorize all request except login and sign up

  app.use(verifyToken);
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

startApp();
