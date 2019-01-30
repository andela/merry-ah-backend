import express from 'express';
import ParamsChecker from '../middlewares/ParamsChecker';
import CommentsController from '../controllers/CommentsController';
import CommentValidator from '../middlewares/CommentValidator';
import VerifyUserStatus from '../middlewares/VerifyUserStatus';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import CommentChecker from '../middlewares/CommentChecker';

const commentRouter = express.Router();

commentRouter
  .post(
    '/:artId',
    TokenAuthenticate.tokenVerify,
    VerifyUserStatus.isActive,
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
    CommentChecker.findComment,
    CommentsController.updateComment
  );
commentRouter
  .get(
    '/:commentId/history',
    ParamsChecker.idChecker,
    CommentsController.getEditHistory
  );

export default commentRouter;
