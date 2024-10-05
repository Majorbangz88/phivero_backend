import express from 'express';
import loginUser from '../controllers/userController';
import registerUser from '../controllers/userController';
import adminLogin from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

export default userRouter;