/* eslint-disable import/no-cycle */
import express from 'express';
import ReadingStat from '../middlewares/ReadingStatMiddleware';
import ArtsController from '../controllers/ArtsController';
import UserMiddleware from '../middlewares/UserMiddleware';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import ArtistVerify from '../middlewares/ArtistVerify';
import ArticleValidator from '../middlewares/ArticleValidator';

const artsRoute = express.Router();

artsRoute.get('/', ArtsController.getAllArticles);
artsRoute.get('/:slug', ReadingStat.getStat, ArtsController.getSingleArticle);
artsRoute.get('/', ArtsController.getAllArticles);


artsRoute.post(
  '/',
  TokenAuthenticate.tokenVerify,
  ArticleValidator.createArticleValidator,
  ArtistVerify.userTypeChecker,
  ArtsController.create
);

artsRoute.put(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtistVerify.userTypeChecker,
  ArtsController.update
);

artsRoute.delete(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtistVerify.userTypeChecker,
  ArtsController.delete
);

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

export default artsRoute;
