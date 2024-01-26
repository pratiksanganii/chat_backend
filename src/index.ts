import { config } from 'dotenv';
import { connectDB } from './database/db';
import express, { Express, Request, Response } from 'express';
import { verifyToken } from './middleware/authMiddleware';
import userRouter from './routes/userRoutes';
config();

async function startApp() {
  const app: Express = express();
  const PORT = process.env.PORT || 4000;
  await connectDB();
  app.get('/', (req: Request, res: Response) => {
    res.json('Hello world!');
  });
  app.use('/user', userRouter);

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

startApp();
