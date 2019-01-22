import express from 'express';
import ParamsChecker from '../middlewares/ParamsChecker';
import CommentsController from '../controllers/CommentsController';
import CommentValidator from '../middlewares/CommentValidator';

const commentRouter = express.Router();

commentRouter
  .post(
    '/:artId',
    ParamsChecker.idChecker,
    CommentValidator.createCommentValidator,
    CommentsController.createComment
  );
commentRouter
  .put(
    '/:commentId',
    ParamsChecker.idChecker,
    CommentValidator.createCommentValidator,
    CommentsController.updateComment
  );

export default commentRouter;
