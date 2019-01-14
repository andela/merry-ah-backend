import express from 'express';
import UserController from '../controllers/UsersController';
import emailCheck from '../middlewares/emailCheck';
import UserValidator from '../middlewares/userValidator';

const authRouter = express.Router();

authRouter
  .post('/signup',
    UserValidator.UserSignUpValidator,
    emailCheck,
    UserController.signUp);
authRouter
  .post('/signin', UserController.signIn);

export default authRouter;
