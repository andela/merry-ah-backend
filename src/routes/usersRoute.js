import express from 'express';
import UserController from '../controllers/UsersController';

const authRouter = express.Router();
const { signUp } = UserController;
authRouter.post('/signup', signUp)

export  { authRouter };
