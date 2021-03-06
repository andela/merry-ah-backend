import express from 'express';
import SearchController from '../controllers/SearchController';
// import TokenAuthenticate from '../helpers/TokenAuthenticate';

const searchRouter = express.Router();

searchRouter.get(
  '/categories/:categoryId',
  SearchController.getArtsByCategory,
);

searchRouter.get(
  '/:keyword',
  SearchController.searchByKeyword,
);

searchRouter.get(
  '/users/:user',
  SearchController.searchByUser,
);

export default searchRouter;
