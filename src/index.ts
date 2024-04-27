import { config } from 'dotenv';
import { connectDB } from './database/db';
import express, { Express, Request, Response } from 'express';
import userRouter from './routes/userRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import User from './database/model/userModel';
import { verifyJWT } from './helpers/cryptService';
config();

async function startApp() {
  const app: Express = express();
  app.use(cors({ origin: 'http://localhost:3000' }));
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  app.get('/', (req: Request, res: Response) => {
    res.json('Hello world!');
  });

  await connectDB();

  // web socket
  io.on('connection', (socket) => {
    connectUser(socket);
    socket.emit('hello', 'Hello there');
    socket.on('hello', (message) => {
      console.log({ message });
    });
    socket.on('disconnect', (d) => {
      disconnectUser(socket.id);
    });
  });

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

async function disconnectUser(socketId: string) {
  await User.updateOne({ where: { socketId } }, { socketId: null });
}

async function connectUser(socket: Socket) {
  const token = socket.handshake.query.token;
  if (!token || typeof token !== 'string') return;
  const tokenData = verifyJWT(token);
  console.log({ tokenData });
}
