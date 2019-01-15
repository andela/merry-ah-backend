import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { userDetails } from '../mocks/testData';


chai.use(chaiHttp);
const { expect } = chai;
const {
  validUser,
  invalidUser
} = userDetails;

let userToken;

describe('Users Endpoint API Test', () => {
  describe('USERS POST REQUESTS', () => {
    it('it should signup a valid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validUser)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages)
            .eql('User created successfully and verification link sent to your Email');
          expect(res.body.data).to.have.property('token');
          expect(res.status).to.equal(201);
          done(err);
        });
    });
    it('it should not signup an invalid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('Not ok');
          done(err);
        });
    });
    it('it should not signup an invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(res.body.status).eql('Bad request');
          expect(res.body.messages).eql('There was a problem sending');
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
            expect(res.body.messages).eql('Invalid Credentials');
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
        .send({
          email: 'julietezekwe@gmail.com',
          password: 'femi'
        })
        .end((err, res) => {
          expect(res.body.messages).eql('User logged in successfully');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data).to.have.property('token');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
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
    it('it should check for token and return valid password token', (done) => {
      chai.request(app)
        .get(`/api/v1/auth/forgot-password?token=${userToken}`)
        .end((err, res) => {
          expect(res.body.messages).eql('Token retrieved');
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          done(err);
        });
    });
    it('it should not return valid password token', (done) => {
      chai.request(app)
        .get('/api/v1/auth/forgot-password')
        .end((err, res) => {
          expect(res.body.messages).eql('No token provided');
          expect(res.status).to.equal(401);
          expect(res.body.status).eql('Unauthorized');
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
