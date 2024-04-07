import { config } from 'dotenv';
import { connectDB } from './database/db';
import express, { Express, Request, Response } from 'express';
import userRouter from './routes/userRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
config();

async function startApp() {
  const app: Express = express();
  const httpServer = createServer(app);

  app.get('/', (req: Request, res: Response) => {
    res.json('Hello world!');
  });

  app.use(cors({ origin: 'http://localhost:3000' }));

  await connectDB();

  // web socket
  const io = new Server(httpServer);

  app.use(express.json());
  app.use('/api/user', userRouter);
  app.use(errorHandler);
  app.use(notFoundHandler);

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

startApp();
