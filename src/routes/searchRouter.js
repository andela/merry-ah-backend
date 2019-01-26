import express from 'express';
import SearchController from '../controllers/SearchController';
// import TokenAuthenticate from '../helpers/TokenAuthenticate';

const searchRouter = express.Router();

searchRouter.get(
  '/categories/:categoryId',
  SearchController.searchByCategory,
);

export default searchRouter;
