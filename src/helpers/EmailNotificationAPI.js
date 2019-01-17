import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Represents a EmailNotificationAPI.
 */
class EmailNotificationAPI {
  /**
   * @constructor
   * @param {Object} emailPayload - The title of the book.
   */
  constructor(emailPayload) {
    this.mailOptions = {
      from: `"Merry Ah 👻" <${process.env.EMAILUSER}>`, // sender address
      to: emailPayload.recipient, // list of receivers
      subject: emailPayload.subject, // Subject line
      text: emailPayload.message, // html body
      html: `<p> ${emailPayload.message} </p>` // html body
    };
  }

  /**
   * @Represents a transportCreator
   * @return {Object|string} nodemailer Transport OR Error message string.
   */
  static transportCreator() {
    const {
      EMAILHOST, EMAILPORT, EMAILUSER, EMAILPASS
    } = process.env;
    if (!EMAILUSER || !EMAILPASS || !EMAILHOST) {
      return 'Please configure your .env file properly';
    }

    return nodemailer.createTransport({
      host: EMAILHOST,
      port: EMAILPORT || 2525,
      auth: {
        user: EMAILUSER,
        pass: EMAILPASS
      }
    });
  }

  /**
   * @Represents sendEmail
   * @return {string|Object} Success message | Error
   */
  async sendEmail() {
    const mailOptions = this.mailOptions;

    try {
      const mail = await EmailNotificationAPI.transportCreator()
        .sendMail(mailOptions);
      if (mail.response.includes('250')) {
        return 'Message sent';
      }
    } catch (error) {
      return error;
    }
  }
}

export default EmailNotificationAPI;
