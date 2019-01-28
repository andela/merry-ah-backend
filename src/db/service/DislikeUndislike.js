/* eslint-disable valid-jsdoc */
import models from '../models';

const { Dislike, DislikeSummary } = models;

/**
 * LikeUnlike Service
 */
class DisikeUndislike {
  /**
   * @static
   * @param {number} req
   * @memberof DisikeUndislike
   * @returns updated details | new detail
   */
  static async dislike(id) {
    const countDislike = await Dislike.count({
      where: {
        artId: id,
      }
    });
    const findDislikeSummary = await DislikeSummary.findOne({
      where: {
        artId: id,
      }
    });
    if (findDislikeSummary) {
      const dislikes = findDislikeSummary.noOfLikes + 1;
      findDislikeSummary.noOfLikes = dislikes;
      findDislikeSummary.save();
    } else {
      DislikeSummary.create({
        artId: id,
        noOfLikes: countDislike,
      });
    }
  }

  /**
   * @static
   * @param {number} id
   * @memberof DisikeUndislike
   * @returns updated details | new detail
   */
  static async undislike(id) {
    const findDislikeSummary = await DislikeSummary.findOne({
      where: {
        artId: id,
      }
    });
    if (findDislikeSummary) {
      const dislikes = findDislikeSummary.noOfLikes - 1;
      findDislikeSummary.noOfLikes = dislikes;
      findDislikeSummary.save();
    } else {
      return false;
    }
  }
}

export default DisikeUndislike;
