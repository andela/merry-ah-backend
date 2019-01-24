/* eslint-disable valid-jsdoc */
import models from '../models';

const { CommentReaction, CommentReactionSummary, } = models;

/**
 * LikeUnlikeComment Service
 */
class LikeUnlikeComment {
  /**
  * @static
  * @param {number} req
  * @memberof LikeUnlikeComment
  * @returns updated details | new detail
  */
  static async like(id) {
    const countLike = await CommentReaction.count({
      where: {
        commentId: id,
      }
    });
    const findLikeSummary = await CommentReactionSummary.findOne({
      where: {
        commentId: id,
      }
    });
    if (findLikeSummary) {
      const likes = findLikeSummary.noOfLikes + 1;
      findLikeSummary.noOfLikes = likes;
      findLikeSummary.save();
    } else {
      CommentReactionSummary.create({
        commentId: id,
        noOfLikes: countLike,
      });
    }
  }

  /**
  * @static
  * @param {number} id
  * @memberof LikeUnlikeComment
  * @returns updated details | new detail
  */
  static async unlike(id) {
    const findLikeSummary = await CommentReactionSummary.findOne({
      where: {
        commentId: id,
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
export default LikeUnlikeComment;
