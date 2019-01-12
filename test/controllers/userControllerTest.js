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
  });
});
