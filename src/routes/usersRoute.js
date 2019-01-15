import express from 'express';
import UserController from '../controllers/UsersController';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserMiddleware from '../middlewares/UserMiddleware';

const authRouter = express.Router();

authRouter.post('/signup', UserController.signUp);

authRouter.post(
  '/forgot-password',
  UserMiddleware.VerifyEmail,
  UserController.forgotPassword
);

authRouter.get(
  '/forgot-password',
  UserController.getPasswordToken,
);
authRouter.put(
  '/forgot-password',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validatePassword,
  UserController.completeForgotPassword,
);
authRouter.post('/signin', UserController.signIn);

// eslint-disable-next-line import/prefer-default-export
export { authRouter };
