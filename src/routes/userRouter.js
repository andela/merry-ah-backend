import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserValidator from '../middlewares/UsersValidator';
import UsersController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';

const userRouter = express.Router();

userRouter
  .put(
    '/profile',
    TokenAuthenticate.tokenVerify,
    UserValidator.userProfileValidator,
    UsersController.updateProfile
  );

userRouter.get(
  '/artists',
  TokenAuthenticate.tokenVerify,
  UsersController.listArtists,
);

userRouter.get(
  '/artists/:artistId',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateArtistID,
  UsersController.getOneArtist,
);

export default userRouter;
