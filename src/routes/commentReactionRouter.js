import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import CommentReaction from '../controllers/CommentReactionController';
import CheckComment from '../middlewares/CheckComment';

const commentReactionRouter = express.Router();

commentReactionRouter
  .post(
    '/:commentId/like',
    TokenAuthenticate.tokenVerify,
    CheckComment.checkComment,
    CommentReaction.likeComment
  );
commentReactionRouter
  .post(
    '/:commentId/unlike',
    TokenAuthenticate.tokenVerify,
    CheckComment.checkComment,
    CommentReaction.unlikeComment
  );
export default commentReactionRouter;
