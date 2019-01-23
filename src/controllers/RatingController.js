import ratingQuery from '../db/service/rate';
import Response from '../helpers/response';

/** Rating Controller Class */
class RatingController {
  /**
   * @static
   * @desc POST /api/v1/rate/:item
   * @param {object} req
   * @param {object} res
   * @memberof RatingController
   * @returns {object} res
   */
  static async addItemRating(req, res) {
    const { artId } = req.params;
    const { verifyUser } = req;
    const { rating } = req.body;

    try {
      const addRatingResponse = await ratingQuery
        .addRating(artId, verifyUser.id, rating);
      if (addRatingResponse) {
        const response = new Response(
          'Ok',
          201,
          'Rating has been added',
          addRatingResponse.dataValues
        );
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = new Response(
        'Not Ok',
        500,
        `${error}`
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @desc GET /api/v1/rate/:item
   * @param {object} req
   * @param {object} res
   * @memberof RatingController
   * @returns {object} res
   */
  static async getItemRating(req, res) {
    const { artId } = req.params;

    try {
      const doesRatingExists = await ratingQuery.getItemRating(artId);
      if (doesRatingExists) {
        const response = new Response(
          'Ok',
          200,
          'Art Rating Exists',
          doesRatingExists.dataValues
        );
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = new Response(
        'Not Ok',
        500,
        `${error}`
      );
      return res.status(response.code).json(response);
    }
    const response = new Response(
      'Ok',
      200,
      'Art Rating Does not exist',
    );
    return res.status(response.code).json(response);
  }

  /**
   * @static
   * @desc GET /api/v1/rate/:item/user
   * @param {object} req
   * @param {object} res
   * @memberof RatingController
   * @returns {object} res
   */
  static async getUserItemRating(req, res) {
    const { artId } = req.params;
    const { verifyUser } = req;

    try {
      const getUserItemRatingResponse = await ratingQuery
        .getUserItemRating(artId, verifyUser.id);

      if (getUserItemRatingResponse) {
        const response = new Response(
          'Ok',
          200,
          `${verifyUser
            .username} Rated Art ID ${artId} : ${getUserItemRatingResponse
            .dataValues.rating}`,
          getUserItemRatingResponse.dataValues
        );
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = new Response(
        'Not Ok',
        500,
        `${error}`
      );
      return res.status(response.code).json(response);
    }
    const response = new Response(
      'Ok',
      404,
      `${verifyUser.username} has no rating for Art ID: ${artId}`
    );
    return res.status(response.code).json(response);
  }
}

export default RatingController;
