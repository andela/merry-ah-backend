import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserValidator from '../middlewares/UsersValidator';
import UsersController from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UserMiddleware';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import VerifyUserStatus from '../middlewares/VerifyUserStatus';

const userRouter = express.Router();

userRouter
  .put(
    '/profile-update',
    TokenAuthenticate.tokenVerify,
    VerifyUserStatus.isActive,
    UserValidator.userProfileValidator,
    UsersController.updateProfile
  );

userRouter.get(
  '/artists',
  TokenAuthenticate.tokenVerify,
  VerifyUserStatus.isActive,
  UsersController.listArtists,
);
userRouter.get(
  '/',
  TokenAuthenticate.tokenVerify,
  VerifyUserStatus.isActive,
  VerifyAdmin.isAdmin,
  UsersController.getAllUsers,
);
userRouter.get(
  '/artists/:artistId',
  TokenAuthenticate.tokenVerify,
  VerifyUserStatus.isActive,
  UserMiddleware.validateArtistID,
  UsersController.getOneArtist,
);
userRouter.put(
  '/:userId/roles',
  TokenAuthenticate.tokenVerify,
  VerifyUserStatus.isActive,
  VerifyAdmin.isAdmin,
  UsersController.assignRole,
);

export default userRouter;
