import express from 'express';
import UserController from '../controllers/UsersController';

const authRouter = express.Router();

authRouter.post('/signup', UserController.signUp);
authRouter.post('/signin', UserController.signIn);

// eslint-disable-next-line import/prefer-default-export
export { authRouter };
