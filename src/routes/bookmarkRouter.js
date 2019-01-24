import express from 'express';
import BookmarkController from '../controllers/BookmarkController';
import BookmarkValidator from '../middlewares/BookmarkValidator';
import ParamsChecker from '../middlewares/ParamsChecker';

const bookmarkRouter = express.Router();

bookmarkRouter.post(
  '/art/:artId',
  ParamsChecker.idChecker,
  BookmarkValidator.doesArtExist,
  BookmarkController.addBookmark
);
bookmarkRouter.delete(
  '/art/:bookmarkId',
  ParamsChecker.idChecker,
  BookmarkController.removeBookmark
);
bookmarkRouter.get(
  '/',
  BookmarkController.getUserBookmarks
);

export default bookmarkRouter;
