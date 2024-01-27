import { config } from 'dotenv';
import { connectDB } from './database/db';
import express, { Express, Request, Response } from 'express';
import { verifyToken } from './middleware/authMiddleware';
import userRouter from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

config();

async function startApp() {
  const app: Express = express();
  const PORT = process.env.PORT || 4000;
  await connectDB();
  app.get('/', (req: Request, res: Response) => {
    res.json('Hello world!');
  });
  app.use(express.json());
  app.use('/user', userRouter);
  app.use(verifyToken);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

startApp();
