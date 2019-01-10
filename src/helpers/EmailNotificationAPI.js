// const nodemailer = require('nodemailer');
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

class EmailNotificationAPI {

  constructor(emailPayload){
    this.mailOptions = {
      from: '"Merry Ah 👻" <team@merry-ah.io>', // sender address
      to: emailPayload.recipient, // list of receivers
      subject: emailPayload.message, // Subject line
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

  sendEmail(){
    const mailOptions = this.mailOptions;

    EmailNotificationAPI.transportCreator().sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }
}

const sampleEmail = new EmailNotificationAPI({
  recipient: "didunloluwa.morodolu@andela.com",
  subject: "Subject",
  message: "Hello, World from Merry world"
});

const test = sampleEmail.sendEmail();
