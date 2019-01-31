import models from '../models';

const {
  Bookmark,
  Art,
} = models;

module.exports = {
  async addBookmark(artId, userId) {
    const queryResponse = await Bookmark.findOrCreate({
      where: {
        artId,
        userId,
      }
    }).spread((obj, created) => {
      if (created) {
        return obj.get();
      }
      return created;
    });
    return queryResponse;
  },
  async removeBookmark(bookmarkId) {
    const queryResponse = await Bookmark.destroy({
      where: {
        id: bookmarkId,
      }
    });
    return queryResponse;
  },
  async getUserBookmarks(userId) {
    const queryResponse = await Bookmark.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Art,
          as: 'Art',
          attributes: [
            'id',
            'artistId',
            'slug',
            'title',
            'description',
            'featuredImg'
          ],
        },
      ]
    });
    return queryResponse;
  },
};
