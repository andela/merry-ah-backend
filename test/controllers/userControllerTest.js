/* eslint-disable max-len */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { userDetails } from '../mocks/testData';


chai.use(chaiHttp);
const { expect } = chai;
const {
  validUser,
  validUserTT,
  validUserSignup,
  invalidUser,
  invalidUserEmail,
  invalidUserType,
  spacedField,
  validArtist,
  validArtist1,
  validArtist2,
  validProfile,
  invalidProfile,
  invalidImage,
  invalidBio,
} = userDetails;

let updateToken;

let userToken, loginToken, loginToken2;

describe('Users Endpoint API Test', () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'email@gmail.com', password: 'abcdefgh' })
      .end((err, res) => {
        userToken = res.body.data.token;
        updateToken = res.body.data.token;
        done(err);
      });
  });
  describe('USERS POST REQUESTS', () => {
    it('it should signup a valid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validUserSignup)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages)
            .eql('User created successfully and verification link sent to your Email');
          expect(res.body.data).to.have.property('token');
          expect(res.status).to.equal(201);
          done(err);
        });
    });
    it('it should not signup user if email exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validUser)
        .end((err, res) => {
          expect(res.body.status).to.equal('Unsuccessful');
          expect(res.body.messages).eql('Email already exists. Input a different email');
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('it should not signup a user with invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidUserEmail)
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('Email is not valid');
          done(err);
        });
    });
    it('it should not signup an invalid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('First Name is required');
          expect(res.body.data[1]).eql('Last Name is required');
          expect(res.body.data[2]).eql('Username is required');
          expect(res.body.data[3]).eql('User type is required');
          expect(res.body.data[4]).eql('Email is required');
          expect(res.body.data[5]).eql('Email is not valid');
          expect(res.body.data[6]).eql('Password is required');
          expect(res.body.data[7]).eql('Minimum password length is 5 characters');
          done(err);
        });
    });
    it('it should not signup an invalid usertype', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidUserType)
        .end((err, res) => {
          expect(res.body.status).eql('Not found');
          expect(res.body.code).eql(404);
          expect(res.body.messages).eql('This user type does not exist');
          done(err);
        });
    });
    it('it should not signup a user with any empty field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(spacedField)
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.code).eql(400);
          expect(res.body.messages).eql('Invalid credentials');
          done(err);
        });
    });
    it('it should not signin a user with an empty email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: 'abejidefemi1'
        })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.code).eql(400);
          expect(res.body.messages).eql('Invalid credentials');
          done(err);
        });
    });
    it('it should not signin a user with an empty password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abejdiefemi@gmail.com',
          password: ''
        })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.code).eql(400);
          expect(res.body.messages).eql('Invalid credentials');
          done(err);
        });
    });
    it('it should not sign in an invalid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('Email is required');
          expect(res.body.data[1]).eql('Email is not valid');
          expect(res.body.data[2]).eql('Password is required');
          expect(res.body.data[3]).eql('Minimum password length is 5 characters');
          done(err);
        });
    });
    it('it should not signin a user if password is less than 5', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abejdiefemi@gmail.com',
          password: 'aaa'
        })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.code).eql(400);
          expect(res.body.messages).eql('Invalid credentials');
          done(err);
        });
    });
    it('it should not signin a user with an invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'abejide',
          password: 'abejidefemi1'
        })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.code).eql(400);
          expect(res.body.messages).eql('Invalid credentials');
          done(err);
        });
    });
    it('it should not sign in a user with an email that does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(invalidUser.email, invalidUser.password)
          .end((err, res) => {
            expect(res.body.status).eql('Bad Request');
            expect(res.body.messages).eql('Invalid credentials');
            done(err);
          });
      });
    it('it should not sign in a user with a password that does not exist',
      (done) => {
        const user = {
          email: 'julietezekwe@gmail.com',
          password: 'pocococo'
        };
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((err, res) => {
            expect(res.body.status).eql('Bad Request');
            expect(res.body.messages).eql('Invalid Credentials');
            done(err);
          });
      });
    it('it should sign in a user with valid email and password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(validUser)
        .end((err, res) => {
          expect(res.body.status).eql('Ok');
          expect(res.body.messages).eql('User logged in successfully');
          const { token } = res.body.data;
          loginToken = token;
          done(err);
        });
    });
    it('it should send a reset password mail to a valid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgot-password')
        .send({
          email: 'email@gmail.com'
        })
        .end((err, res) => {
          expect(res.body.messages).eql('Email sent successfully');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data).to.have.property('token');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          const { token } = res.body.data;
          userToken = token;
          done(err);
        });
    });
    it('it should not send a reset mail to an invalid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgot-password')
        .send({
          email: 'daniel@gmail.com'
        })
        .end((err, res) => {
          expect(res.body.messages).eql('Email does not exist');
          expect(res.status).to.equal(404);
          expect(res.body.status).eql('Not Found');
          done(err);
        });
    });
    it('it should return error status when email field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgot-password')
        .send({
          email: ''
        })
        .end((err, res) => {
          expect(res.body.messages).eql('Email field cannot be left empty');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('it should reset user password', (done) => {
      chai.request(app)
        .put('/api/v1/auth/forgot-password')
        .set('x-access-token', userToken)
        .send({
          password: 'qwerty',
          confirmPassword: 'qwerty'
        })
        .end((err, res) => {
          expect(res.body.messages).eql('Password reset successful');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('it should return error status when password field is empty', (done) => {
      chai.request(app)
        .put('/api/v1/auth/forgot-password')
        .set('x-access-token', userToken)
        .send({
          confirmPassword: 'qwerty'
        })
        .end((err, res) => {
          expect(res.body.messages).eql('Password field cannot be empty');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('it should return unauthorized when user token is missing', (done) => {
      chai.request(app)
        .put('/api/v1/auth/forgot-password')
        .send({
          password: 'qwerty',
          confirmPassword: 'qwerty'
        })
        .end((err, res) => {
          expect(res.body.message).eql('No token provided');
          expect(res.status).to.equal(401);
          expect(res.body.status).eql('error');
          done(err);
        });
    });
    it('it should not reset password when passwords do not match', (done) => {
      chai.request(app)
        .put('/api/v1/auth/forgot-password')
        .set('x-access-token', userToken)
        .send({
          password: 'qwerty',
          confirmPassword: 'qwertyx'
        })
        .end((err, res) => {
          expect(res.body.messages).eql('Passwords do not match');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('it should not update user with empty fields', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .set('Authorization', userToken)
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('Biography cannot be empty');
          expect(res.body.data[1]).eql('Biography should be more than 5 words');
          expect(res.body.data[2]).eql('imgURL is cannot be empty');
          expect(res.body.data[3]).eql('Only Jpeg, Png or Gif is accepted image format');
          expect(res.body.data[4]).eql('userType cannot be empty');
          done(err);
        });
    });
    it('it should not update user with empty fields', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .set('Authorization', updateToken)
        .send(invalidImage)
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('Only Jpeg, Png or Gif is accepted image format');
          done(err);
        });
    });
    it('it should not update user with empty fields', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .set('Authorization', updateToken)
        .send(invalidBio)
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('Biography should be more than 5 words');
          done(err);
        });
    });
    it('it should not update user with space in the fields', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .set('Authorization', updateToken)
        .send({ bio: 'hahh jhvhjv hhv hgghg hhjhhj', imgURL: 'hhxvvh.gif', userType: '       ' })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('userType cannot be empty');
          done(err);
        });
    });
    it('it should not update user with wrong usertype', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .set('Authorization', updateToken)
        .send(invalidProfile)
        .end((err, res) => {
          expect(res.body.status).eql('Not found');
          expect(res.body.messages).eql('This user type does not exist');
          done(err);
        });
    });
    it('it should update logged in user with valid update', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .set('authorization', updateToken)
        .send({ bio: 'hahh jhvhjv hhv hgghg hhjhhj', imgURL: 'hhxvvh.png', userType: 'user' })
        .end((err, res) => {
          expect(res.body.messages).eql('Profile updated successfully');
          done(err);
        });
    });
    it('it should not update user with invalid token', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .set('authorization', `invalid${updateToken}`)
        .send({ bio: 'hahh jhvhjv hhv hgghg hhjhhj', imgURL: 'hhxvvh.gif', userType: 'user' })
        .end((err, res) => {
          expect(res.body.message).eql('Unauthorized token');
          done(err);
        });
    });
    it('it should not update non logged in user', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile-update')
        .send(validProfile)
        .end((err, res) => {
          expect(res.body.message).eql('No token provided');
          expect(res.body.status).eql('error');
          expect(res.status).eql(401);
          done(err);
        });
    });
  });
  describe('Follow and Unfollow Functionality', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validArtist1)
        .end((err) => {
          done(err);
        });
    });
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validArtist2)
        .end((err) => {
          done(err);
        });
    });
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(validUserTT)
        .end((err, res) => {
          const { token } = res.body.data;
          loginToken2 = token;
          done(err);
        });
    });
    before((done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/follow/${4}`)
        .set('x-access-token', loginToken)
        .end((err) => {
          done(err);
        });
    });
    it('user should follow an artist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/follow/${11}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql(`You are now following artist ${11}`);
          expect(res.status).to.equal(201);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('user should follow another artist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/follow/${12}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql(`You are now following artist ${12}`);
          expect(res.status).to.equal(201);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('another user should follow an artist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/follow/${11}`)
        .set('x-access-token', loginToken2)
        .end((err, res) => {
          expect(res.body.messages).eql(`You are now following artist ${11}`);
          expect(res.status).to.equal(201);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('should return error when artist id is not integer', (done) => {
      chai.request(app)
        .post('/api/v1/users/artists/follow/ddd')
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Artist ID must be an integer');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('should return error when artist id is equal to user id', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/follow/${6}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('You cannot follow or unfollow yourself');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('should return error when artist id is equal to user id', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/follow/${100}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('User may not exist or is not an artist');
          expect(res.status).to.equal(404);
          expect(res.body.status).eql('Not Found');
          done(err);
        });
    });
    it('should return response of already following the artist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/follow/${11}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('You are already following this artist');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });

    it('user should unfollow an artist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/unfollow/${11}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql(`You have unfollowed artist ${11}`);
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('should return error when artist id is not integer', (done) => {
      chai.request(app)
        .post('/api/v1/users/artists/unfollow/ddd')
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Artist ID must be an integer');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('should return error when artist id is equal to user id', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/unfollow/${6}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('You cannot follow or unfollow yourself');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('should return error when artist id does not exist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/unfollow/${100}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('User may not exist or is not an artist');
          expect(res.status).to.equal(404);
          expect(res.body.status).eql('Not Found');
          done(err);
        });
    });
    it('should return response of not following the artist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/artists/unfollow/${11}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('You are not following this artist');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('should fetch a list of followers for a user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${11}/followers`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Returned all followers');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('should return error when user id is not integer', (done) => {
      chai.request(app)
        .get('/api/v1/users/ddd/followers')
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('User ID must be an integer');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('should return error when user is invalid', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${100}/followers`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('User has no followers');
          expect(res.status).to.equal(404);
          expect(res.body.status).eql('Not Found');
          done(err);
        });
    });
    it('should fetch a list of followings for a user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${6}/following`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Returned all users this person follows');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('should return error when user id is not integer', (done) => {
      chai.request(app)
        .get('/api/v1/users/ddd/following')
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('User ID must be an integer');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('should return error when user has no following', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${100}/following`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body.messages).eql('User is not following anyone');
          expect(res.status).to.equal(404);
          expect(res.body.status).eql('Not Found');
          done(err);
        });
    });
  });
  describe('USERS GET REQUESTS', () => {
    it('should return error status if artist id is not an integer', (done) => {
      chai.request(app)
        .get('/api/v1/users/artists/ddd')
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages).eql('Artist ID must be an integer');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Bad Request');
          done();
        });
    });
    it('it should return not found status if artist do not exist', (done) => {
      chai.request(app)
        .get(`/api/v1/users/artists/${100}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages).eql('Artist was not found');
          expect(res.status).to.equal(404);
          expect(res.body.status).eql('Not Found');
          done();
        });
    });
  });
  describe('USERS GET REQUESTS', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validArtist)
        .end((err) => {
          done(err);
        });
    });
    it('it should fetch list of artists on the platform', (done) => {
      chai.request(app)
        .get('/api/v1/users/artists')
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages).eql('Returned all artists');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          expect(res.body.data).to.have.property('artists');
          expect(res.body.data.artists).to.be.a('array');
          done();
        });
    });
    it('it should return profile of one artist on the platform', (done) => {
      chai.request(app)
        .get(`/api/v1/users/artists/${1}`)
        .set('x-access-token', loginToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages).eql('Returned one artist');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          expect(res.body.data).to.have.property('artist');
          expect(res.body.data.artist).to.be.a('object');
          done();
        });
    });
  });
});
