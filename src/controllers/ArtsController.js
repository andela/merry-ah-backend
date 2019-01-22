/* eslint-disable valid-jsdoc */
import models from '../db/models';
import Response from '../helpers/response';
import LikeUnlike from '../db/service/LikeUnlike';

const { Like } = models;

/**
 * Arts Controller
 */
class ArtsController {
  /**
   * @static
   * @desc POST /api/v1/articles/:artId/like
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns successful like
   */
  static async likeArticle(req, res) {
    try {
      const { artId } = req.params;
      const { id } = req.verifyUser;

      const like = await Like.findOrCreate({
        artId,
        userId: id,
      })
        .spread((user, created) => {
          user.get({ plain: true });
          return created;
        });

      if (!like) {
        const response = new Response(
          'Bad Request',
          400,
          'You have already liked this article',
        );
        return res.status(response.code).json(response);
      }

      LikeUnlike.like(artId);

      const response = new Response(
        'Ok',
        200,
        `You just liked article ${artId}`,
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @desc POST /api/v1/articles/:artId/unlike
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns successful unlike
   */
  static async unlikeArticle(req, res) {
    try {
      const { artId } = req.params;
      const { id } = req.verifyUser;

      const unlike = await Like.destroy({
        where: {
          artId,
          userId: id
        },
      });

      if (!unlike) {
        const response = new Response(
          'Bad Request',
          400,
          'You never liked this article',
        );
        return res.status(response.code).json(response);
      }

      LikeUnlike.unlike(artId);

      const response = new Response(
        'Ok',
        200,
        `You just unliked article ${artId}`,
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default ArtsController;
