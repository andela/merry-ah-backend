import express from 'express';
import ArtController from '../controllers/ArtsController';
import { TokenAuthenticate } from '../helpers/index';

const artsRoute = express.Router();

artsRoute.post('/', TokenAuthenticate.tokenVerify, ArtController.create);

artsRoute.put('/:slug', TokenAuthenticate.tokenVerify, ArtController.update);

artsRoute.delete(
  '/:slug',
  TokenAuthenticate.tokenVerify,
  ArtController.delete
);

export default artsRoute;
