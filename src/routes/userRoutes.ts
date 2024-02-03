import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
const userRouter = Router();

// authorize all request except login and sign up
userRouter.use(verifyToken);
export default userRouter;
