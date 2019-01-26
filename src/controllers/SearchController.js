import models from '../db/models';
import Response from '../helpers/response';

const { Category, Art, User, } = models;

class SearchController {
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
            attributes: ['id','username'],
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

  static async searchByKeyword(req, res) {}
  
  static async searchByArtist(req, res) {}
}

export default SearchController;
