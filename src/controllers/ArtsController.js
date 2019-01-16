import models from '../db/models';
import { TokenAuthenticate, Response, Slugify } from '../helpers/index';

const { Art, Media, Category } = models;

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

      const { id: artistId } = decoded;

      const {
        title, description, categoryId, media,
      } = req.body;

      const mediaFilesArray = JSON.parse(media);

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

      const checkCategory = await Category.findOne({ where: { id: 1 } });
      if (!checkCategory) {
        await Category.create({ categoryName: 'Architecture' });
      }

      const createArticle = await Art
        .create({
          artistId,
          slug: slugifiedTitle,
          title,
          description,
          categoryId,
          featuredImg: mediaFilesArray[0].url
            || process.env.DEFAULT_ARTICLE_IMAGE,
          status: defaultStatus
        });

      const {
        id: artId,
        title: artTitle,
        description: artDescription,
        featuredImg: artFeaturedImg,
        categoryId: artCategoryId
      } = createArticle.dataValues;

      if (mediaFilesArray.length > 0) {
        let cnt = 0;
        await mediaFilesArray.some((mediaFile) => {
          cnt += 1;
          Media.create({
            artId,
            contentUrl: mediaFile.url,
            mediaType: mediaFile.extension
          });
          return cnt === 7;
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

  /**
   * @desc PUT /api/v1/articles
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns {Object} ARTicle details
   */
  static async update(req, res) {
    try {
      const decoded = await TokenAuthenticate.decodeToken(req);
      const validationErrors = [];

      const { id: artistId } = decoded;
      const { slug } = req.params;

      const artToUpdate = await Art.findOne({
        where: { slug }
      });

      if (!artToUpdate) {
        response = new Response(
          'Not Found',
          404,
          'Sorry. Article Not Found'
        );
        return res.status(response.code).json(response);
      }

      if (artistId !== artToUpdate.artistId) {
        response = new Response(
          'Not Ok',
          403,
          'Unauthorized to Edit Article',
          {}
        );
        return res.status(response.code).json(response);
      }

      const {
        title, description, categoryId, media,
      } = req.body;

      const mediaFilesArray = JSON.parse(media);

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

      const updatedArticle = {
        id: artToUpdate.id,
        title: title || artToUpdate.title,
        slug: slugifiedTitle,
        description: description || artToUpdate.description,
        categoryId: categoryId || artToUpdate.categoryId,
        featuredImg: mediaFilesArray[0].url || artToUpdate.featuredImg,
        createdAt: artToUpdate.createdAt
      };

      const mediaToDelete = await Media.destroy({
        where: { artId: artToUpdate.id }
      });

      if (mediaToDelete) {
        mediaFilesArray.splice(6);
        await mediaFilesArray.forEach((mediaFile) => {
          Media.create({
            artId: artToUpdate.id,
            contentUrl: mediaFile.url,
            mediaType: mediaFile.extension
          });
        });
      }

      const updateArticleSuccess = await artToUpdate.update(updatedArticle);

      response = new Response(
        'Ok',
        200,
        'Article updated successfully',
        updateArticleSuccess
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

  /**
   * @desc DELETE /api/v1/articles
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns {Object} ARTicle details
   */
  static async delete(req, res) {
    try {
      const { slug } = req.params;

      const decoded = await TokenAuthenticate.decodeToken(req);
      const { id: artistId } = decoded;

      const artToDelete = await Art.findOne({
        where: { slug }
      });

      if (!artToDelete) {
        response = new Response(
          'Not Found',
          404,
          'Sorry. Article Not Found'
        );
        return res.status(response.code).json(response);
      }

      if (artistId !== artToDelete.artistId) {
        response = new Response(
          'Not Ok',
          403,
          'Unauthorized to Delete Article',
          {}
        );
        return res.status(response.code).json(response);
      }

      const artDeleted = await Art.destroy({
        where: { slug }
      });

      response = new Response(
        'Ok',
        200,
        'Article deleted successfully',
        { artToDelete: artDeleted }
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
