import models from '../db/models';
import { TokenAuthenticate, Response, Slugify } from '../helpers/index';

const { Art, Media } = models;

let response;

/** Arts Controller Class */
class ArtsController {
  /**
   * @desc POST /api/v1/articles
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * This will receive a media object containing a list of media files
   * @returns {Object} ARTicle details
   */
  static async create(req, res) {
    try {
      const decoded = await TokenAuthenticate.decodeToken(req);
      const defaultStatus = 0;
      const validationErrors = [];

      const { id: userId } = decoded;

      const {
        title, description, categoryId, media,
      } = req.body;

      const mediaFiles = media;
      req.check('title', 'Title is required').notEmpty();
      req.check('description', 'Description should be longer').notEmpty()
        .isLength({ min: 15 });

      const errors = req.validationErrors();

      if (errors) {
        errors.map(err => validationErrors.push(err.msg));
        response = new Response(
          'Not Ok',
          400,
          'Validation Errors Occurred',
          { validationErrors }
        );
        return res.status(response.code).json(response);
      }

      const slugifiedTitle = Slugify.slugify(title, true);

      const createArticle = await Art
        .create({
          user_id: userId,
          slug: slugifiedTitle,
          title,
          description,
          category_id: categoryId,
          featuredImg: mediaFiles[0].url || process.env.DEFAULT_ARTICLE_IMAGE,
          status: defaultStatus
        });

      const {
        id: artId,
        title: artTitle,
        description: artDescription,
        featuredImg: artFeaturedImg,
        categoryId: artCategoryId
      } = createArticle.dataValues;


      const mediaFilesArray = Object.keys(mediaFiles).map(
        key => mediaFiles[key]
      );
      if (mediaFilesArray.length > 0) {
        let cnt = 0;
        await mediaFilesArray.some((mediaFile) => {
          cnt += 1;
          Media.create({
            art_id: artId,
            content_url: mediaFile.url,
            media_type: mediaFile.extension
          });
          return cnt === 6;
        });
      }

      response = new Response(
        'Ok',
        201,
        'Article created successfully',
        {
          artId,
          artTitle,
          slugifiedTitle,
          artDescription,
          artFeaturedImg,
          artCategoryId
        }
      );

      return res.status(response.code).json(response);
    } catch (err) {
      response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default ArtsController;
