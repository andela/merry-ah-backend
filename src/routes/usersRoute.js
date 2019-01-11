import express from 'express';
import UserController from '../controllers/UsersController';

const authRouter = express.Router();

authRouter.post('/signup', UserController.signUp)

export  { authRouter };
