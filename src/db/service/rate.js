import models from '../models';

const {
  Rate,
  Art,
  User,
  RateSummary
} = models;

module.exports = {
  async addRating(artId, userId, rating) {
    const query = await Rate.findOrCreate({
      where: {
        artId,
        userId,
      },
      defaults: { rating }
    });
    const getSumRating = await Rate.sum('rating', { where: { artId } });
    const getCountRating = await Rate.count({ where: { artId } });
    const caculatedRating = (getSumRating / getCountRating);

    /** Check if rate summary exists, if so update */
    const rateExists = await RateSummary.findOne({ where: { artId } });
    if (rateExists) {
      rateExists.caculatedRate = caculatedRating;
      rateExists.save();
    } else {
      RateSummary.create({
        artId,
        caculatedRate: caculatedRating
      });
    }

    return query;
  },
  async getItemRating(artId) {
    const query = await RateSummary.findOne({ where: { artId } });
    return query;
  },
  async getUserItemRating(artId, userId) {
    const query = await Rate.findOne({ where: { userId, artId } });
    return query;
  },
  async getArt(artId) {
    const query = await Art.findOne({ where: { id: artId } });
    return query;
  },
  async getUser(userId) {
    const query = await User.count({ where: { id: userId } });
    return query;
  },
};
