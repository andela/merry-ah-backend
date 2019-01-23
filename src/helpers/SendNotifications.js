import Pusher from 'pusher';
import dotenv from 'dotenv';
import models from '../db/models';
import EmailNotificationAPI from './EmailNotificationAPI';

dotenv.config();

const {
  Art, Following, User
} = models;

/** Arts Controller Class */
class SendNotifications {
  /**
   * @constructor
   * @param {Object} details - Details of the notification.
   */
  constructor(details) {
    this.details = details;
  }

  /**
   * @Represents a newArticleNotification
   * @param {string} articleID - The id of the article.
   * @return {Object|string} success string OR Error message .
   */
  static async newArticleNotification(articleID) {
    const findArt = await Art.findOne({
      where: { id: articleID },
      include: [
        {
          model: User,
          as: 'Author',
          attributes: ['username'],
        }
      ],
      attributes: {
        exclude: ['updatedAt', 'status']
      },
    });

    if (!findArt) {
      return { message: 'Art not found' };
    }

    const {
      artistId, slug, title, featuredImg, description, Author
    } = findArt.dataValues;

    const { username: artistUsername } = Author;

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

    const pusher = new Pusher({
      appId: process.env.PUSHER_APPID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      encrypted: true
    });

    followers.forEach((follower) => {
      mailList.push(follower.User.email);

      pusher.trigger('notifications', `follower-${follower.User.id}-event`, {
        message: `<a href="${process.env.APP_BASE_URL}/api/v1/arts/${slug}">
        New Article: ${title} <br> by ${artistUsername}</a>`
      });
    });


    const sendEmailNotifications = new EmailNotificationAPI({
      to: '"Team Merry 👻" <noreplyteammerryah@gmail.com>',
      bcc: mailList,
      subject: `New Article: ${title} <br> by ${artistUsername}`,
      message: `<h3>New Article: ${title} <br> 
by ${artistUsername}</h3>
<h6>Check it out here:</h6>
<p><img src="${featuredImg}" width="450px" height="200px"
alt="Featured Image"></p>
<p><a href="http://${process.env.APP_BASE_URL}/api/v1/arts/${slug}"> 
${title} </a><br> by ${artistUsername}</p>
<p>${description}</p>`
    });
    return sendEmailNotifications.sendEmail();
  }


  /**
   * @Represents a notificationsCreator
   * @return {Object|string} success string OR Error message .
   */
  async create() {
    const { details } = this;

    const { type, artId } = details;

    try {
      if (type === 'newArticle') {
        return await SendNotifications.newArticleNotification(artId);
      }
    } catch (err) {
      return err;
    }
  }
}

export default SendNotifications;
