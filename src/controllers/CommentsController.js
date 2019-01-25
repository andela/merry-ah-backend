import models from '../db/models';
import Response from '../helpers/response';
import { sendNotifications } from '../helpers';

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

        const notifyNewComments = new sendNotifications({
          type: 'newComment',
          commentDetails: {
            artId,
            userId: id,
            body
          }
        });

        const newCommentsNotified = await notifyNewComments.create();

        const response = new Response(
          'created',
          201,
          'Comment added successfully',
          newCommentsNotified
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
}

export default CommentsController;
