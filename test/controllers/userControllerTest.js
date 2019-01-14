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
  invaliduser,
  invalidUserEmail,
  invalidUserType
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
          done();
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
          done();
        });
    });
    it('it should not signup a user without the complete required feilds', (done) => {
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
          done();
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
          done();
        });
    });
    it('it should not signup a user with any empty field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invaliduser)
        .end((err, res) => {
          expect(res.body.status).eql('Bad request');
          expect(res.body.code).eql(400);
          expect(res.body.messages).eql('Please fill in all fields');
          done();
        });
    });
  });
});
