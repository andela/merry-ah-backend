import express from 'express';
import UserController from '../controllers/UsersController';
import emailCheck from '../middlewares/emailCheck';
import UserValidator from '../middlewares/UsersValidator';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserMiddleware from '../middlewares/UserMiddleware';

const authRouter = express.Router();

authRouter
  .post('/signup',
    UserValidator.userSignUpValidator,
    emailCheck,
    UserController.signUp);
authRouter.post(
  '/forgot-password',
  UserMiddleware.VerifyEmail,
  UserController.forgotPassword
);
authRouter.put(
  '/forgot-password',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validatePassword,
  UserController.completeForgotPassword,
);
authRouter.post('/signin', UserController.signIn);
authRouter
  .get('/verify', TokenAuthenticate.tokenVerify, UserController.verifyEmail);

export default authRouter;
