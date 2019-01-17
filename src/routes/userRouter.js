import express from 'express';
import UsersController from '../controllers/UsersController';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserMiddleware from '../middlewares/UserMiddleware';

const userRouter = express.Router();

userRouter.post(
  '/artists/follow/:artistId',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateFollowerAndArtistID,
  UsersController.userFollow,
);

userRouter.post(
  '/artists/unfollow/:artistId',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateFollowerAndArtistID,
  UsersController.userUnfollow,
);

export default userRouter;
