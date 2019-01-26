import express from 'express';
import ArtController from '../controllers/ArtsController';
import { TokenAuthenticate } from '../helpers/index';
import VerifyUserStatus from '../middlewares/VerifyUserStatus';

const artsRoute = express.Router();

artsRoute
  .post(
    '/', TokenAuthenticate.tokenVerify,
    VerifyUserStatus.isActive,
    ArtController.create
  );

artsRoute.put('/:slug', TokenAuthenticate.tokenVerify, ArtController.update);

artsRoute.delete(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  VerifyUserStatus.isActive,
  ArtController.delete
);

artsRoute.get('/', ArtController.getAllArticles);
artsRoute.get('/:slug', ArtController.getSingleArticle);

export default artsRoute;
