import express from 'express';
import ArtController from '../controllers/ArtsController';
import { TokenAuthenticate } from '../helpers/index';

const authRouter = express.Router();

authRouter.post('/', TokenAuthenticate.tokenVerify, ArtController.create);

authRouter.put('/:slug', TokenAuthenticate.tokenVerify, ArtController.update);

authRouter.delete(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtController.delete
);

authRouter.get('/', ArtController.getAllArticles);
authRouter.get('/:slug', ArtController.getSingleArticle);

export default authRouter;
