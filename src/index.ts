import { config } from 'dotenv';
import { connectDB } from './database/db';
import express, { Express, Request, Response } from 'express';
import userRouter from './routes/userRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import cors from 'cors';
config();

async function startApp() {
  const app: Express = express();
  const PORT = process.env.PORT || 4000;
  await connectDB();
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.get('/', (req: Request, res: Response) => {
    res.json('Hello world!');
  });
  app.use(express.json());

  app.use('/user', userRouter);
  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

startApp();
