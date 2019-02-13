
import models from '../db/models';
import Response from '../helpers/response';

const { Comment } = models;
/** CheckComment Middleware */
class CheckCommentMiddleware {
  /**
 * Check Comment
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @memberof CheckCommentMiddleware
 * @returns {object} error object if comment id does not exist
 */
  static async checkComment(req, res, next) {
    const commentId = await Comment.findById(req.params.commentId);
    if (!commentId) {
      const response = new Response(
        'Not Found',
        404,
        'Comment not found',
      );
      return res.status(response.code).json(response);
    }
    next();
  }
}
export default CheckCommentMiddleware;
