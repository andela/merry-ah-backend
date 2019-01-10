'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // const nodemailer = require('nodemailer');


var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var EmailNotificationAPI = function () {
  function EmailNotificationAPI(emailPayload) {
    _classCallCheck(this, EmailNotificationAPI);

    this.mailOptions = {
      from: '"Merry Ah 👻" <team@merry-ah.io>', // sender address
      to: emailPayload.recipient, // list of receivers
      subject: emailPayload.message, // Subject line
      text: emailPayload.message, // plain text body
      html: '<p> ' + emailPayload.message + ' </p>' // html body
    };
  }

  _createClass(EmailNotificationAPI, [{
    key: 'sendEmail',
    value: function sendEmail() {
      var mailOptions = this.mailOptions;

      EmailNotificationAPI.transportCreator().sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', _nodemailer2.default.getTestMessageUrl(info));
      });
    }
  }], [{
    key: 'transportCreator',
    value: function transportCreator() {
      var _process$env = process.env,
          EMAILHOST = _process$env.EMAILHOST,
          EMAILPORT = _process$env.EMAILPORT,
          EMAILUSER = _process$env.EMAILUSER,
          EMAILPASS = _process$env.EMAILPASS;


      return _nodemailer2.default.createTransport({
        host: EMAILHOST || "smtp.mailtrap.io",
        port: EMAILPORT || 2525,
        auth: {
          user: EMAILUSER || "a763207f5e2390",
          pass: EMAILPASS || "f62498d3b50a31"
        }
      });
    }
  }]);

  return EmailNotificationAPI;
}();

var sampleEmail = new EmailNotificationAPI({
  recipient: "didunloluwa.morodolu@andela.com",
  subject: "Subject",
  message: "Hello, World from Merry world"
});

var test = sampleEmail.sendEmail();