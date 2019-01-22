import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import ArtsController from '../controllers/ArtsController';
import UserMiddleware from '../middlewares/UserMiddleware';

const artsRoute = express.Router();

artsRoute.post(
  '/:artId/like',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateArtID,
  ArtsController.likeArticle,
);

export default artsRoute;
