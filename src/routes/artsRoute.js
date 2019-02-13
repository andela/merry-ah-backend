import express from 'express';
import ArtController from '../controllers/ArtsController';
import { TokenAuthenticate } from '../helpers/index';
import ReadingStat from '../middlewares/ReadingStatMiddleware';
import ArtsController from '../controllers/ArtsController';
import UserMiddleware from '../middlewares/UserMiddleware';

const artsRoute = express.Router();

artsRoute.post(
  '/:artId/like',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateArtID,
  ArtsController.likeArticle,
);

artsRoute.post(
  '/:artId/dislike',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validateArtID,
  ArtsController.dislikeArticle,
);

artsRoute.post('/', TokenAuthenticate.tokenVerify, ArtsController.create);
artsRoute
  .post(
    '/', TokenAuthenticate.tokenVerify,
    ArtsController.create
  );

artsRoute.put('/:slug', TokenAuthenticate.tokenVerify, ArtsController.update);

artsRoute.delete(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtsController.delete
);

artsRoute.get('/', ArtController.getAllArticles);
artsRoute.get('/:slug', ReadingStat.getStat, ArtController.getSingleArticle);
artsRoute.get('/', ArtsController.getAllArticles);

export default artsRoute;
