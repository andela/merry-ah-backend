import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import ParamsChecker from '../middlewares/ParamsChecker';
import CommentsController from '../controllers/CommentsController';
import CommentValidator from '../middlewares/CommentValidator';
import VerifyUserStatus from '../middlewares/VerifyUserStatus';

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

export default commentRouter;
