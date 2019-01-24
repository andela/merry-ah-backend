import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import CommentReaction from '../controllers/CommentReactionController';

const commentReactionRouter = express.Router();

commentReactionRouter
  .post(
    '/:commentId/like',
    TokenAuthenticate.tokenVerify,
    CommentReaction.likeComment
  );
commentReactionRouter
  .post(
    '/:commentId/unlike',
    TokenAuthenticate.tokenVerify,
    CommentReaction.unlikeComment
  );
export default commentReactionRouter;
