/* eslint-disable max-len */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);
const { expect } = chai;
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
  describe('Report POST REQUESTS', () => {
    it('it should return error for empty fiels', (done) => {
      chai.request(app)
        .post('/api/v1/arts/1/report')
        .set('Authorization', userToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });
    it('it should return not found for an art id that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/arts/50/report')
        .set('Authorization', userToken)
        .send({
          reportText: 'this is some nad adad',
          reportType: 'Spam'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should return error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/arts/1/report')
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('error');
          expect(res.body.message).eql('No token provided');
          done(err);
        });
    });
    it('it should return error if report text is empty', (done) => {
      chai.request(app)
        .post('/api/v1/arts/1/report')
        .set('Authorization', userToken)
        .send({
          reportText: '',
          reportType: 'Spam'
        })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('it should return error if report type is empty', (done) => {
      chai.request(app)
        .post('/api/v1/arts/1/report')
        .set('Authorization', userToken)
        .send({
          reportText: 'sfsfsdfbdjfbdjgdjgbdg',
          reportType: ''
        })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('it should return 404 if report type does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/arts/1/report')
        .set('Authorization', userToken)
        .send({
          reportText: 'sfsfsdfbdjfbdjgdjgbdg',
          reportType: 'karma'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    it('it should create a report if report text and type is valid', (done) => {
      chai.request(app)
        .post('/api/v1/arts/1/report')
        .set('Authorization', userToken)
        .send({
          reportText: 'sfsfsdfbdjfbdjgdjgbdg',
          reportType: 'Abuse'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done(err);
        });
    });
  });
  describe('GET all reports', () => {
    it('should get all reports', (done) => {
      chai.request(app)
        .get('/api/v1/arts/reports')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
});
