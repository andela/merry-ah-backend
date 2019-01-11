import express from 'express';
import UsersController from '../controllers/UsersController';

const authRouter = express.Router();
const { signUp } = UsersController;
authRouter.post('/signup', signUp)

export  { authRouter };
