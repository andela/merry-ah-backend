import express from 'express';
import ArtController from '../controllers/ArtsController';
import { TokenAuthenticate } from '../helpers/index';
import ArtistVerify from '../middlewares/ArtistVerify';
import ArticleValidator from '../middlewares/ArticleValidator';

const artsRoute = express.Router();

artsRoute.post(
  '/',
  TokenAuthenticate.tokenVerify,
  ArticleValidator.createArticleValidator,
  ArtistVerify.userTypeChecker,
  ArtController.create
);

artsRoute.put(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArticleValidator.createArticleValidator,
  ArtistVerify.userTypeChecker,
  ArtController.update
);

artsRoute.delete(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtistVerify.userTypeChecker,
  ArtController.delete
);

artsRoute.get('/', ArtController.getAllArticles);
artsRoute.get('/:slug', ArtController.getSingleArticle);

export default artsRoute;
