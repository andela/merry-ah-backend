import models from '../db/models';
import TokenAuthenticate from '../helpers/tokenAuthentication';
import Response from '../helpers/response';
const { User, Profile } = models;
import passwordHash from '../helpers/passwordHash';
import EmailNotificationAPI from '../helpers/EmailNotificationAPI.js'; 


/**
 * @description Defines the actions to for the users endpoints
 * @class UserController
 */


 class UserController {
   static async signUp(req, res){
       let response;
      const signUpType = 'local';
    try{
    const { firstname, lastname, email, username, password, userType, bio, imgURL } = req.body;
      const hash = await passwordHash(password, 10);

      const signup = await User
      .create({
        email,
        username,
        password: hash,
        userType,
        signUpType,
        isVerified: 0
      });
      const { id, username: registeredUsername, email: registeredEmail, userType: userSignupType }  = signup.dataValues;
      await Profile
      .create({
        userId: id,
        firstname,
        lastname,
        bio,
        imgURL,
      });
      const userDetails = {id, registeredUsername, registeredEmail, userSignupType };
      const token = await TokenAuthenticate.generateToken(userDetails, '10hr');
      const emailBody = `<h1>Verification link</h1><br>
        <a href='http://localhost:9000/api/v1/user?token=${token}'><button style='font-size: 20px; background: orange;'>verify</button></a><br>
        <p>Kindly click on the button above to verify your email. This link will <strong>expire in 24hrs</strong></p>
        `;
        const sendVerificationLink = new EmailNotificationAPI({
        recipient: registeredEmail,
        subject: "Email Verification",
        message: emailBody
    });

   sendVerificationLink.sendEmail();

  response = new Response(
    'Ok',
    201,
    `User created successfully and verification link sent to your Email`,
    {token}
  );
      return res.status(response.code).json(response);
    }
    catch(err){
        response = new Response(
            'Not ok',
            500,
            `${err}`,
          );
          return res.status(response.code).json(response);
    }
   }
 }

 export default UserController;
