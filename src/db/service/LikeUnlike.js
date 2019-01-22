/* eslint-disable valid-jsdoc */
import models from '../models';

const { Like, LikeSummary, } = models;

/**
 * LikeUnlike Service
 */
class LikeUnlike {
  /**
   * @static
   * @param {number} req
   * @memberof LikeUnlike
   * @returns updated details | new detail
   */
  static async like(id) {
    const countLike = await Like.count({
      where: {
        artId: id,
      }
    });
    const findLikeSummary = await LikeSummary.findOne({
      where: {
        artId: id,
      }
    });
    if (findLikeSummary) {
      const likes = findLikeSummary.noOfLikes + 1;
      findLikeSummary.noOfLikes = likes;
      findLikeSummary.save();
    } else {
      LikeSummary.create({
        artId: id,
        noOfLikes: countLike,
      });
    }
  }

  /**
   * @static
   * @param {number} id
   * @memberof Follow
   * @returns updated details | new detail
   */
  static async unlike(id) {
    const findLikeSummary = await LikeSummary.findOne({
      where: {
        userId: id,
      }
    });
    if (findLikeSummary) {
      const likes = findLikeSummary.noOfLikes - 1;
      findLikeSummary.noOfLikes = likes;
      findLikeSummary.save();
    } else {
      return false;
    }
  }
}

export default LikeUnlike;
