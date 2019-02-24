import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserValidator from '../middlewares/UsersValidator';
import UsersController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';
import VerifyAdmin from '../middlewares/VerifyAdmin';

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
userRouter
  .put(
    '/profile-update',
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
  '/',
  TokenAuthenticate.tokenVerify,
  VerifyAdmin.isAdmin,
  UsersController.getAllUsers,
);
userRouter.get(
  '/artists/:artistId',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateArtistID,
  UsersController.getOneArtist,
);
userRouter.get(
  '/:userId/profile',
  UsersController.getAUser,
);
userRouter.put(
  '/:userId/roles',
  TokenAuthenticate.tokenVerify,
  VerifyAdmin.isAdmin,
  UsersController.assignRole,
);

userRouter.get(
  '/:userId/followers',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.checkUserID,
  UsersController.getFollowers,
);

userRouter.get(
  '/:userId/following',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.checkUserID,
  UsersController.getFollowing,
);

export default userRouter;
