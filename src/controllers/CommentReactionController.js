import models from '../db/models';
import Response from '../helpers/response';
import LikeUnlikeComment from '../db/service/commentReactionSummary';

const { CommentReaction } = models;
/** CommentReaction Controller */
class CommentReactionController {
  /**
   * @static
   * @param {Object} req
   * @param {object} res
   * @param {object} done
   * @return {object} comment
   */
  static async likeComment(req, res, done) {
    try {
      LikeUnlikeComment.like(req.params.commentId);
      CommentReaction.findOrCreate({
        where: {
          commentId: req.params.commentId,
          userId: req.verifyUser.id
        },
        defaults: {
          userId: req.verifyUser.id,
          commentId: req.params.commentId,
        }
      }).spread((user, isLiked) => {
        if (isLiked) {
          const response = new Response(
            'Created',
            201,
            'Comment liked'
          );
          return res.status(response.code).json(response);
        }
        const response = new Response(
          'Bad request',
          400,
          'Comment already liked'
        );
        res.status(response.code).json(response);
        return done(null, user);
      });
    } catch (err) {
      const response = new Response(
        'Not ok',
        500,
        `${err.message}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
  * @static
  * @desc POST /api/v1/comments/:commentId/unlike
  * @param {object} req
  * @param {object} res
  * @memberof ArtsController
  * @returns {object} successful unlike
  */
  static async unlikeComment(req, res) {
    try {
      const { commentId } = req.params;
      const { id } = req.verifyUser;

      const unlike = await CommentReaction.destroy({
        where: {
          commentId,
          userId: id
        },
      });

      if (!unlike) {
        const response = new Response(
          'Bad Request',
          400,
          'You never liked this comment',
        );
        return res.status(response.code).json(response);
      }

      LikeUnlikeComment.unlike(commentId);

      const response = new Response(
        'Ok',
        200,
        `You just unliked comment ${commentId}`,
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err.message}`,
      );
      return res.status(response.code).json(response);
    }
  }
}
export default CommentReactionController;
