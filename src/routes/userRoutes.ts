import { Router } from 'express';
import { login, signUp } from '../controller/userController';
import { verifyToken } from '../middleware/authMiddleware';
const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/signup', signUp);
// authorize all request except login and sign up
userRouter.use(verifyToken);
export default userRouter;
