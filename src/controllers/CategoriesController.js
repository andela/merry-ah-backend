import models from '../db/models';
import Response from '../helpers/response';

const {
  Category
} = models;

/** Arts Controller Class */
class CategoriesController {
  /**
   * @desc GET /api/v1/categories
   * @param {object} req
   * @param {object} res
   * @memberof CategoriesController
   * @returns {Object} All Articles
   */
  static async getCategories(req, res) {
    try {
      const categories = await Category.findAndCountAll({
        order: [
          ['categoryName', 'ASC'],
        ],
        attributes: [
          'id',
          'categoryName'
        ]
      });

      const response = new Response(
        'Ok',
        200,
        'All Categories',
        {
          categories
        }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal Server Error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default CategoriesController;
