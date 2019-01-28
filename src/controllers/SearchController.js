import { Op } from 'sequelize';
import models from '../db/models';
import Response from '../helpers/response';

const { Category, Art, User } = models;

/**
 * Search Controller
 */
class SearchController {
  /**
   * @static
   * @desc POST /api/v1/search/categories/:categoryId
   * @param {object} req
   * @param {object} res
   * @memberof SearchController
   * @returns {object} arts matching the specified category
   */
  static async searchByCategory(req, res) {
    try {
      const { categoryId } = req.params;

      const arts = await Art.findAll({
        where: {
          categoryId,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        order: [
          ['id', 'DESC']
        ],
        include: [
          {
            model: Category,
            attributes: ['categoryName'],
            as: 'Category'
          },
          {
            model: User,
            attributes: ['id', 'username'],
            as: 'Author'
          },
        ]
      });

      if (!arts) {
        const response = new Response(
          'Not Found',
          404,
          'No arts for this category',
        );
        return res.status(response.code).json(response);
      }

      const response = new Response(
        'Ok',
        200,
        'Returned all arts',
        { arts }
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
   * @desc POST /api/v1/search/:keyword
   * @param {object} req
   * @param {object} res
   * @memberof SearchController
   * @returns {object} arts matching the specified keyword
   */
  static async searchByKeyword(req, res) {
    try {
      const { keyword } = req.params;

      const arts = await Art.findAll({
        where: {
          title: {
            [Op.iLike]: `%${keyword}%`
          },
        }
      });

      if (!arts) {
        const response = new Response(
          'Not Found',
          404,
          'No arts for this keyword',
        );
        return res.status(response.code).json(response);
      }

      const response = new Response(
        'Ok',
        200,
        'Returned all arts',
        { arts }
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
   * @desc POST /api/v1/search/:keyword
   * @param {object} req
   * @param {object} res
   * @memberof SearchController
   * @returns {object} arts matching the specified artist
   */
  static async searchByArtist(req, res) {}
}

export default SearchController;
