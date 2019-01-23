import express from 'express';
import ParamsChecker from '../middlewares/ParamsChecker';
import CommentsController from '../controllers/CommentsController';
import CommentValidator from '../middlewares/CommentValidator';
import TokenAuthenticate from '../helpers/TokenAuthenticate';

const commentRouter = express.Router();

commentRouter
  .post(
    '/:artId',
    TokenAuthenticate.tokenVerify,
    ParamsChecker.idChecker,
    CommentValidator.createCommentValidator,
    CommentsController.createComment
  );
commentRouter
  .put(
    '/:commentId',
    TokenAuthenticate.tokenVerify,
    ParamsChecker.idChecker,
    CommentValidator.createCommentValidator,
    CommentsController.updateComment
  );
commentRouter
  .get(
    '/:commentId/history',
    ParamsChecker.idChecker,
    CommentsController.getEditHistory
  );

export default commentRouter;
