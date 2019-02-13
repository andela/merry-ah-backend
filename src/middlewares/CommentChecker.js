import models from '../db/models';
import Response from '../helpers/response';

const { Comment } = models;

/**
 * A module that checks if email already exists at sign up
 * @module commentChecker
 */
class CommentChecker {
/**
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next function to be executed
 * @return {next} next
 */
  static async findComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const { id } = req.verifyUser;
      const findComment = await Comment.find({
        where: {
          id: commentId
        }
      });
      if (findComment) {
        if (findComment.userId === id) {
          req.commentDetails = findComment;
          return next();
        }
        const response = new Response(
          'Unauthorized',
          401,
          'You are not authorized to modify this comment',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Not Found',
        404,
        'This comment does not exist',
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default CommentChecker;
