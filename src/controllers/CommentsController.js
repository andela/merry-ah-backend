import models from '../db/models';
import Response from '../helpers/response';

const { Comment, Art } = models;

/**
 * Represents a CommentsController.
 */
class CommentsController {
  /**
   * @static
   * @param {Object} req
   * @param {object} res
   * @return {object} comment
   */
  static async createComment(req, res) {
    try {
      const { body } = req.body;
      const { artId } = req.params;
      const { id } = req.verifyUser;

      const findArt = await Art.find({
        where: {
          id: artId
        }
      });
      if (findArt) {
        await Comment.create({
          userId: id,
          artId,
          body
        });
        const response = new Response(
          'created',
          201,
          'Comment added successfully',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Not Found',
        404,
        'This art does not exist',
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

  /**
   * @static
   * @param {Object} req
   * @param {object} res
   * @return {object} comment
   */
  static async getAllComments(req, res) {
    const { lastId } = req.query;
    const { artId } = req.params;
    const allComments = await Comment.findAll({ where: { artId } });
    const lastCommentId = allComments[allComments.length - 1].id;
    let retriveOffset = lastCommentId - (lastId - 1);
    if (retriveOffset < 0 || retriveOffset >= lastCommentId) retriveOffset = 0;
    const limit = 10;
    const offset = retriveOffset;
    try {
      const getComments = await Comment.findAll({
        where: { artId },
        limit,
        offset,
        order: [
          ['id', 'DESC'],
        ],
      });
      const response = new Response(
        'Ok',
        200,
        'Success',
        getComments
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

  /**
   * @static
   * @param {Object} req
   * @param {object} res
   * @return {object} deleted comment
   */
  static async deleteComment(req, res) {
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
          await Comment.destroy(
            {
              where: {
                id: commentId
              }
            }
          );
          const response = new Response(
            'Ok',
            200,
            'Comment deleted successfully',
          );
          return res.status(response.code).json(response);
        }
        const response = new Response(
          'Unauthorized',
          401,
          'You are not authorized to delete this comment',
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

export default CommentsController;
