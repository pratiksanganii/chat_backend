import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { login, signUp } from '../controller/userController';
const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/signup', signUp);
// authorize all request except login and sign up
userRouter.use(verifyToken);
export default userRouter;
