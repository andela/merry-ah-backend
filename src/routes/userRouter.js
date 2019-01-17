import express from 'express';
import UsersController from '../controllers/UsersController';
import TokenAuthenticate from '../helpers/TokenAuthenticate';

const userRouter = express.Router();

userRouter.get(
  '/artists',
  TokenAuthenticate.tokenVerify,
  UsersController.listArtists,
);

userRouter.get(
  '/artists/:artistId',
  TokenAuthenticate.tokenVerify,
  UsersController.getOneArtist,
);

export default userRouter;
