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
describe('Users Endpoint API Test', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .end((err, res) => {
        done();
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
        expect(res.body.status).eql('Bad request');
        expect(res.body.code).eql(400);
        expect(res.body.messages).eql('Please fill in all fields');
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
      .send(validUser)
      .end((err, res) => {
        expect(res.body.status).eql('Ok');
        expect(res.body.messages).eql('User logged in successfully');
        done(err);
      });
  });
});
