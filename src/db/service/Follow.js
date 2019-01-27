/* eslint-disable valid-jsdoc */
import models from '../models';

const { Following, FollowSummary, } = models;

/**
 * Follow Service
 */
class Follow {
  /**
   * @static
   * @param {number} req
   * @memberof Follow
   * @returns updated details | new detail
   */
  static async follower(id) {
    const countFollowing = await Following.count({
      where: {
        followerId: id,
      }
    });
    const findFollowingSummary = await FollowSummary.findOne({
      where: {
        userId: id,
      }
    });
    if (findFollowingSummary) {
      const following = findFollowingSummary.following + 1;
      findFollowingSummary.following = following;
      findFollowingSummary.save();
    } else {
      FollowSummary.create({
        userId: id,
        following: countFollowing,
      });
    }
  }

  /**
   * @static
   * @param {number} id
   * @memberof Follow
   * @returns updated details | new detail
   */
  static async followed(id) {
    const countFollower = await Following.count({
      where: {
        userId: id,
      }
    });
    const findFollowerSummary = await FollowSummary.findOne({
      where: {
        userId: id,
      }
    });
    if (findFollowerSummary) {
      const followers = findFollowerSummary.followers + 1;
      findFollowerSummary.followers = followers;
      findFollowerSummary.save();
    } else {
      FollowSummary.create({
        userId: id,
        followers: countFollower,
      });
    }
  }
}

export default Follow;
