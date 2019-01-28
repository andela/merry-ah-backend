/* eslint-disable valid-jsdoc */
import models from '../models';

const { FollowSummary, } = models;

/**
 * Follow Service
 */
class Unfollow {
  /**
   * @static
   * @param {number} req
   * @memberof UnFollow
   * @returns Updated details | false
   */
  static async unfollower(id) {
    const findFollowingSummary = await FollowSummary.findOne({
      where: {
        userId: id,
      }
    });
    if (findFollowingSummary) {
      const following = findFollowingSummary.following - 1;
      findFollowingSummary.following = following;
      findFollowingSummary.save();
    } else {
      return false;
    }
  }

  /**
   * @static
   * @param {number} id
   * @memberof Follow
   * @returns Updated details | false
   */
  static async unfollowed(id) {
    const findFollowerSummary = await FollowSummary.findOne({
      where: {
        userId: id,
      }
    });
    if (findFollowerSummary) {
      const followers = findFollowerSummary.followers - 1;
      findFollowerSummary.followers = followers;
      findFollowerSummary.save();
    } else {
      return false;
    }
  }
}

export default Unfollow;
