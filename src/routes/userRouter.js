import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserValidator from '../middlewares/UsersValidator';
import UsersController from '../controllers/UsersController';

const userRouter = express.Router();

userRouter
  .put('/profile',
    TokenAuthenticate.tokenVerify,
    UserValidator.userProfileValidator,
    UsersController.updateProfile);

export default userRouter;
