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
  validUser1,
  invalidUser,
  invalidUserEmail,
  invalidUserType,
  spacedField,
} = userDetails;

let userToken;

describe('Users Endpoint API Test', () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .end((err) => {
        done(err);
      });
  });
  describe('USERS POST REQUESTS', () => {
    it('it should signup a valid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validUser1)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages)
            .eql('User created successfully and verification link sent to your Email');
          expect(res.body.data).to.have.property('token');
          expect(res.status).to.equal(201);
          done(err);
        });
    });
    it('it should signup user if email exist', (done) => {
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
          done(err);
        });
    });
    it('it should send a reset password mail to a valid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgot-password')
        .send({
          email: 'julietezekwe@gmail.com'
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
  });
});
