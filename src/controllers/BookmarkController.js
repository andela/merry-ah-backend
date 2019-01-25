import bookmarkQuery from '../db/service/bookmark';
import Response from '../helpers/response';

/** Bookmark Controller Class */
class BookmarkController {
  /**
   * @static
   * @desc POST /api/v1/bookmark/art/:item
   * @param {object} req
   * @param {object} res
   * @memberof BookmarkController
   * @returns {object} res
   */
  static async addBookmark(req, res) {
    const { artId } = req.params;
    const { verifyUser } = req;

    try {
      const addBookmarkResponse = await bookmarkQuery
        .addBookmark(artId, verifyUser.id);
      /** check if bookmark was added successfully */
      if (addBookmarkResponse) {
        const response = new Response(
          'Created',
          201,
          'Bookmark has been added',
          addBookmarkResponse
        );
        return res.status(response.code).json(response);
      }
      /** Return response if bookmark has preoviously been added */
      if (!addBookmarkResponse) {
        const response = new Response(
          'Conflict',
          409,
          `User has already bookmarked this Item : ${artId}`
        );
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = new Response(
        'Internal Server Error',
        500,
        `${error}`
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @desc DELETE /api/v1/bookmark/:bookmarkId
   * @param {object} req
   * @param {object} res
   * @memberof BookmarkController
   * @returns {object} res
   */
  static async removeBookmark(req, res) {
    const { bookmarkId } = req.params;
    try {
      const removebookmarkResponse = await bookmarkQuery
        .removeBookmark(bookmarkId);

      /** Check if bookmark was not deleted */
      if (removebookmarkResponse === 0) {
        const response = new Response(
          'Not Found',
          404,
          'Bookmark does not exist or has previously been deleted',
        );
        return res.status(response.code).json(response);
      }

      /** Check if bookmark was deleted successfully */
      if (removebookmarkResponse === 1) {
        const response = new Response(
          'Accepted',
          202,
          'Bookmark has successfully been deleted'
        );
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = new Response(
        'Internal Server Error',
        500,
        `${error}`
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @desc GET /api/v1/bookmark/
   * @param {object} req
   * @param {object} res
   * @memberof BookmarkController
   * @returns {object} res
   */
  static async getUserBookmarks(req, res) {
    const { verifyUser } = req;

    try {
      const userBookmarks = await bookmarkQuery
        .getUserBookmarks(verifyUser.id);

      /** Return Bookmarks found for User */
      if (userBookmarks.length > 0) {
        const response = new Response(
          'Ok',
          200,
          `${userBookmarks.length} Bookmarks found for user`,
          userBookmarks
        );
        return res.status(response.code).json(response);
      }
      /** Check if no bookmark found for user */
      if (userBookmarks.length === 0) {
        const response = new Response(
          'Not Found',
          404,
          'No Bookmarks was found for User',
          userBookmarks
        );
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = new Response(
        'Internal Server Error',
        500,
        `${error}`
      );
      return res.status(response.code).json(response);
    }
  }
}

export default BookmarkController;
