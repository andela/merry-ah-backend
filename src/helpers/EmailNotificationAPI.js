import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailNotificationAPI {

  constructor(emailPayload){
    this.mailOptions = {
      from: `"Merry Ah 👻" <${process.env.EMAILUSER}>`, // sender address
      to: emailPayload.recipient, // list of receivers
      subject: emailPayload.subject, // Subject line
      text: emailPayload.message, // plain text body
      html: `<p> ${emailPayload.message} </p>` // html body
    };
  }

  static transportCreator(){
    const { EMAILHOST, EMAILPORT, EMAILUSER, EMAILPASS } = process.env;

    return nodemailer.createTransport({
      host: EMAILHOST || "smtp.mailtrap.io",
      port: EMAILPORT || 2525,
      auth: {
        user: EMAILUSER || "a763207f5e2390",
        pass: EMAILPASS || "f62498d3b50a31"
      }
    });
  }

  async sendEmail(){
    const mailOptions = this.mailOptions;

    try {
      const mail = await EmailNotificationAPI.transportCreator().sendMail(mailOptions);
      if (mail.response.includes('OK')) return ('Message sent');
    }
    catch (e) {
      if (error) {
        return (error);
      }
    }
  }
}

export default EmailNotificationAPI;
