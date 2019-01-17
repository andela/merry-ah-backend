/* eslint-disable max-len */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { commentDetails } from '../mocks/testData';

chai.use(chaiHttp);
const { expect } = chai;
const { validComment } = commentDetails;
let userToken;

describe('Comments Endpoint API Test', () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'email@gmail.com', password: 'abcdefgh' })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  describe('Comments POST REQUESTS', () => {
    it('it should add a product that exists', (done) => {
      chai.request(app)
        .post('/api/v1/arts/comments/1')
        .set('Authorization', userToken)
        .send(validComment)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages).eql('Comment added successfully');
          expect(res.status).to.equal(201);
          done(err);
        });
    });
    it('it should submit comment for an art that does not exit', (done) => {
      chai.request(app)
        .post('/api/v1/arts/comments/100')
        .set('Authorization', userToken)
        .send(validComment)
        .end((err, res) => {
          expect(res.body.status).to.equal('Not Found');
          expect(res.body.messages).eql('This art does not exist');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should not add comment with non logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/arts/comments/1')
        .send(validComment)
        .end((err, res) => {
          expect(res.body.status).eql('error');
          expect(res.body.message).eql('No token provided');
          done(err);
        });
    });
    it('it should not add comment with no body', (done) => {
      chai.request(app)
        .post('/api/v1/arts/comments/1')
        .set('Authorization', userToken)
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('Invalid credentials');
          expect(res.body.data[0]).eql('Comment body is required');
          done(err);
        });
    });
    it('it should not add comment with invalid art ID', (done) => {
      chai.request(app)
        .post('/api/v1/arts/comments/hhh')
        .set('Authorization', userToken)
        .send(validComment)
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          expect(res.body.messages).eql('ID can only be a number');
          done(err);
        });
    });
  });
});
