import Pusher from 'pusher';
import dotenv from 'dotenv';
import models from '../db/models';
import EmailNotificationAPI from './EmailNotificationAPI';

dotenv.config();

const {
  Art, Comment, Following, User
} = models;

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
});

/** SendNotifications Controller Class */
class SendNotifications {
  /**
   * @constructor
   * @param {Object} payloadObject - Details of the notification.
   */
  constructor(payloadObject) {
    this.payloadObject = payloadObject;
  }

  /**
   * @Represents a newArticleNotification
   * @param {Object} articleDetailsObject - The details of the article.
   * @return {Object|string} success string OR Error message .
   */
  static async newArticleNotification(articleDetailsObject) {
    const {
      artId, artistId, slugifiedTitle, artTitle, artFeaturedImg, artDescription
    } = articleDetailsObject;

    const artistUsername = await User.findOne({
      where: { id: artistId },
      attributes: ['username'],
    });

    const followers = await Following.findAll({
      where: { userId: artistId },
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
        }
      ],
      attributes: [],
    });

    const mailList = [];

    followers.forEach((follower) => {
      const { id, email } = follower.User;
      mailList.push(email);

      pusher.trigger('new-article', `article-${artId}-${id}-event`, {
        message:
          `<a href="${process.env.APP_BASE_URL}/api/v1/arts/${slugifiedTitle}">
        New Article: ${artTitle} <br> by ${artistUsername}</a>`
      });
    });

    const mailDestination = '"Team Merry 👻" <noreplyteammerry@gmail.com>';
    const mailSubject = `New Article: ${artTitle} by ${artistUsername}`;
    const mailBody = `<h3>New Article: ${artTitle} <br> 
by ${artistUsername}</h3>
<h6>Check it out here:</h6>
<p><img src="${artFeaturedImg}" width="450px" height="200px"
alt="Featured Image"></p>
<p><a href="http://${process.env.APP_BASE_URL}/api/v1/arts/${slugifiedTitle}"> 
${artTitle} </a><br> by ${artistUsername}</p>
<p>${artDescription}</p>`;
    const sendEmailNotifications = new EmailNotificationAPI({
      to: mailDestination,
      bcc: mailList,
      subject: mailSubject,
      message: mailBody
    });

    return sendEmailNotifications.sendEmail();
  }

  /**
   * @Represents getUserInfo
   * @param {number} userID - The id of the user.
   * @return {Object} get User's Username
   */
  static async getUserInfo(userID) {
    const findCommenterInfo = await User.findOne({
      where: { id: userID },
      attributes: ['username']
    });
    const { username } = findCommenterInfo.dataValues;
    return { username };
  }

  /**
   * @Represents getArticleAndArtist
   * @param {number} artID - The id of the article.
   * @return {Object} Article And its Artist details .
   */
  static async getArticleAndArtist(artID) {
    const findArticleArtistInfo = await Art.findOne({
      where: { id: artID },
      include: [
        {
          model: User,
          as: 'Author',
          attributes: ['id', 'email']
        }
      ],
      attributes: ['title', 'slug']
    });
    const { title, slug, Author } = findArticleArtistInfo.dataValues;
    const { email: authorEmail, id: authorId } = Author;
    return {
      title, slug, authorEmail, authorId
    };
  }

  /**
   * @Represents a newCommentNotification
   * @param {Object} commentDetailsObjects - The detailed object of the article.
   * @return {Object|string} success string OR Error message .
   */
  static async newCommentNotification(commentDetailsObjects) {
    const {
      artId,
      userId: commenterID,
      body: commentBody
    } = commentDetailsObjects;

    const {
      title: artTitle, slug: artSlug, authorEmail, authorId
    } = await SendNotifications.getArticleAndArtist(artId);

    const {
      username: commenterUsername
    } = await SendNotifications.getUserInfo(commenterID);

    const allExistingComments = await Comment.findAll({
      where: { artId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['email']
        }
      ],
      attributes: ['userId'],
    });

    allExistingComments.splice(allExistingComments.length - 1);

    if (allExistingComments.length > 1) {
      const mailList = [authorEmail];

      allExistingComments.forEach((comment) => {
        const { userId, User: UserModel } = comment.dataValues;
        const { email: commenterEmail } = UserModel;

        mailList.push(commenterEmail);

        const pusherMessageForCommenters = `
<a href="${process.env.APP_BASE_URL}/api/v1/arts/${artSlug}/#comments">
New Comment: ${commentBody} <br> by ${commenterUsername} on <b>${artTitle}</b>
</a>`;
        pusher.trigger('new-comment', `comment-${artId}-${userId}-event`, {
          message: pusherMessageForCommenters
        });
      });

      const pusherMessageForArtist = `
<a href="${process.env.APP_BASE_URL}/api/v1/arts/${artSlug}/#comments">
New Comment: ${commentBody} <br> by ${commenterUsername} on <b>${artTitle}</b>
        </a>`;

      pusher.trigger('new-comment', `comment-${artId}-${authorId}-event`, {
        message: pusherMessageForArtist
      });

      const mailDestination = '"Team Merry 👻" <noreplyteammerry@gmail.com>';
      const mailSubject = `New Comment by ${commenterUsername}`;
      const mailBody = `<h3>New Comment on ${artTitle} 
        by ${commenterUsername}</h3>
        <h4>Check it out here:</h4>
        <p><a href="http://${process.env.APP_BASE_URL}/api/v1/arts/${artSlug}"> 
        ${commentBody}</a><br> by ${commenterUsername}</p>`;

      const sendEmailNotifications = new EmailNotificationAPI({
        to: mailDestination,
        bcc: mailList,
        subject: mailSubject,
        message: mailBody
      });

      return sendEmailNotifications.sendEmail();
    }
    return 'No Comments';
  }

  /**
   * @Represents a notificationsCreator
   * @return {Object|string} success string OR Error message .
   */
  async create() {
    const { type, articleDetails, commentDetails } = this.payloadObject;

    try {
      if (type === 'newArticle') {
        return await SendNotifications.newArticleNotification(articleDetails);
      }
      if (type === 'newComment') {
        return await SendNotifications.newCommentNotification(commentDetails);
      }
    } catch (err) {
      return err;
    }
  }
}

export default SendNotifications;
