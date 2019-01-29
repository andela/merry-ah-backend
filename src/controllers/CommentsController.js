import models from '../db/models';
import Response from '../helpers/response';

const { Comment, Art, UpdatedComment } = models;

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
    const { limit } = req.query;
    try {
      const getComments = await Comment.findAll({
        order: [
          ['id', 'DESC'],
        ],
        where: {
          artId,
          id: {
            $lt: lastId
          }
        },
        limit,
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
   * @return {object} comment
   */
  static async updateComment(req, res) {
    try {
      const { body } = req.body;
      const { commentId } = req.params;
      const { commentDetails } = req;
      await UpdatedComment.create({
        body: commentDetails.body,
        commentId
      });
      await Comment.update({
        body
      },
      {
        where: {
          id: commentId
        }
      });
      const response = new Response(
        'Ok',
        200,
        'Comment updated successfully',
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
  static async getEditHistory(req, res) {
    try {
      const { commentId } = req.params;
      const getUpdatedComments = await UpdatedComment.findAll({
        where: {
          commentId,
        }
      });
      if (getUpdatedComments.length < 1) {
        const response = new Response(
          'Not found',
          404,
          'This comment has not been edited',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Ok',
        200,
        'Successfully retrieved updated comment history',
        getUpdatedComments
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
