import express from 'express';
import UserController from '../controllers/UsersController';
import emailCheck from '../middlewares/emailCheck';
import UserValidator from '../middlewares/UsersValidator';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserMiddleware from '../middlewares/UserMiddleware';


const authRouter = express.Router();

authRouter
  .post('/signup',
    UserValidator.UserSignUpValidator,
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
authRouter.post(
  '/signin', UserValidator.UserSignInValidator,
  UserController.signIn
);

export default authRouter;
