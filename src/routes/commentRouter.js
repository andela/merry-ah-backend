import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import ParamsChecker from '../middlewares/ParamsChecker';
import CommentsController from '../controllers/CommentsController';
import CommentValidator from '../middlewares/CommentValidator';
import CommentChecker from '../middlewares/CommentChecker';

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
  .get(
    '/:artId',
    ParamsChecker.idChecker,
    CommentsController.getAllComments
  );
commentRouter
  .delete(
    '/:commentId',
    TokenAuthenticate.tokenVerify,
    ParamsChecker.idChecker,
    CommentChecker.findComment,
    CommentsController.deleteComment
  );

export default commentRouter;
