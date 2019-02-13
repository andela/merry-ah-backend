import sequelize from 'sequelize';
import models from '../db/models';
import { Response, Slugify } from '../helpers/index';
import LikeUnlike from '../db/service/LikeUnlike';
import DisikeUndislike from '../db/service/DislikeUndislike';

const {
  Art, Media, Category, User, Comment, Like, Dislike
} = models;


/** Arts Controller Class */
class ArtsController {
  /**
   * @desc POST /api/v1/articles
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * This will receive a media object containing a list of media files
   * @returns {Object} Article details
   */
  static async create(req, res) {
    try {
      const defaultStatus = 0;
      const validationErrors = [];
      const { id: artistId } = req.verifyUser;

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
        const response = new Response(
          'Not Ok',
          400,
          'Validation Errors Occurred',
          { validationErrors }
        );
        return res.status(response.code).json(response);
      }

      const slugifiedTitle = Slugify.slugify(title);

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
          status: defaultStatus,
        });

      const {
        id: artId,
        title: artTitle,
        description: artDescription,
        featuredImg: artFeaturedImg,
        categoryId: artCategoryId,
        visited
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

      const response = new Response(
        'Ok',
        201,
        'Article created successfully',
        {
          artId,
          artTitle,
          slugifiedTitle,
          artDescription,
          artFeaturedImg,
          artCategoryId,
          visited
        }
      );

      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Not Ok',
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
   * @returns {Object} Article details
   */
  static async update(req, res) {
    try {
      const validationErrors = [];

      const { id: artistId } = req.verifyUser;
      const { slug } = req.params;

      const artToUpdate = await Art.findOne({
        where: { slug }
      });

      if (!artToUpdate) {
        const response = new Response(
          'Not Found',
          404,
          'Sorry. Article Not Found'
        );
        return res.status(response.code).json(response);
      }

      if (artistId !== artToUpdate.artistId) {
        const response = new Response(
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
        const response = new Response(
          'Not Ok',
          400,
          'Validation Errors Occurred',
          { validationErrors }
        );
        return res.status(response.code).json(response);
      }

      const slugifiedTitle = Slugify.slugify(title);

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

      const response = new Response(
        'Ok',
        200,
        'Article updated successfully',
        updateArticleSuccess
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
   * @desc DELETE /api/v1/articles
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns {Object} Article details
   */
  static async delete(req, res) {
    try {
      const { slug } = req.params;

      const { id: artistId } = req.verifyUser;

      const artToDelete = await Art.findOne({
        where: { slug }
      });

      if (!artToDelete) {
        const response = new Response(
          'Not Found',
          404,
          'Sorry. Article Not Found'
        );
        return res.status(response.code).json(response);
      }

      if (artistId !== artToDelete.artistId) {
        const response = new Response(
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

      const response = new Response(
        'Ok',
        200,
        'Article deleted successfully',
        { artToDelete: artDeleted }
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
   * @desc GET /api/v1/articles
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns {Object} All Articles
   */
  static async getAllArticles(req, res) {
    try {
      const { limit, page } = req.query;
      const limitDefault = limit || 20;
      const pageDefault = page || 1;

      const offset = limitDefault * (pageDefault - 1);

      const articles = await Art.findAndCountAll({
        include: [
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'categoryName'],
          },
          {
            model: User,
            as: 'Author',
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: [],
          }
        ],
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC'],
        ],
        attributes: [
          'id',
          'slug',
          'artistId',
          'categoryId',
          'title',
          'description',
          'featuredImg',
          'createdAt',
          [sequelize.literal(
            '(SELECT COUNT(*) FROM "Comments" C WHERE C."artId" = "Art".id)'
          ), 'CommentsCount']
        ],
        limit: limitDefault,
        offset,
      });
      const pages = Math.ceil(articles.count / limitDefault);
      const response = new Response(
        'Ok',
        200,
        'All Articles',
        {
          articles: articles.rows,
          articlesGrandTotal: articles.count,
          page: pageDefault,
          pages
        }
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
   * @desc GET /api/v1/articles/slug
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns {Object} Single Article
   */
  static async getSingleArticle(req, res) {
    try {
      const { slug } = req.params;

      const article = await Art.findOne({
        where: { slug },
        include: [
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'categoryName'],
          },
          {
            model: Comment,
            attributes: ['id', 'userId', 'body', 'createdAt'],
          },
          {
            model: User,
            as: 'Author',
            attributes: ['username'],
          },
          {
            model: Media,
            as: 'Media',
            attributes: ['id', 'contentUrl'],
          },
        ],
        attributes: {
          exclude: ['updatedAt']
        },
      });


      if (!article) {
        const response = new Response(
          'Not Found',
          404,
          'Sorry. Article Not Found'
        );
        return res.status(response.code).json(response);
      }

      const response = new Response(
        'Ok',
        200,
        'Single Article',
        article
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
   * @desc POST /api/v1/arts/:artId/like
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns {object} successful like
   */
  static async likeArticle(req, res) {
    try {
      const { artId } = req.params;
      const { id } = req.verifyUser;

      const like = await Like.findOrCreate({
        where: {
          artId,
          userId: id
        },
      })
        .spread((user, created) => {
          user.get({ plain: true });
          return created;
        });

      if (!like) {
        await Like.destroy({
          where: {
            artId,
            userId: id
          },
        });

        LikeUnlike.unlike(artId);

        const response = new Response(
          'Ok',
          200,
          `You just unliked article ${artId}`,
        );
        return res.status(response.code).json(response);
      }

      LikeUnlike.like(artId);

      const checkIfDisliked = await Like.findOne({
        where: {
          artId,
          userId: id
        },
      });

      if (checkIfDisliked) {
        await Dislike.destroy({
          where: {
            artId,
            userId: id
          },
        });
        DisikeUndislike.undislike(artId);
      }

      const response = new Response(
        'Ok',
        201,
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
   * @desc POST /api/v1/arts/:artId/dislike
   * @param {object} req
   * @param {object} res
   * @memberof ArtsController
   * @returns {object} successful dislike
   */
  static async dislikeArticle(req, res) {
    try {
      const { artId } = req.params;
      const { id } = req.verifyUser;

      const dislike = await Dislike.findOrCreate({
        where: {
          artId,
          userId: id
        },
      })
        .spread((user, created) => {
          user.get({ plain: true });
          return created;
        });

      if (!dislike) {
        await Dislike.destroy({
          where: {
            artId,
            userId: id
          },
        });

        DisikeUndislike.undislike(artId);

        const response = new Response(
          'Ok',
          200,
          `You just undisliked article ${artId}`,
        );
        return res.status(response.code).json(response);
      }

      DisikeUndislike.dislike(artId);
      const checkIfLiked = await Like.findOne({
        where: {
          artId,
          userId: id
        },
      });

      if (checkIfLiked) {
        await Like.destroy({
          where: {
            artId,
            userId: id
          },
        });
        LikeUnlike.unlike(artId);
      }

      const response = new Response(
        'Ok',
        201,
        `You just disliked article ${artId}`,
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
