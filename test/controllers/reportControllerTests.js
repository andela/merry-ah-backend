/* eslint-disable max-len */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { reportDetails } from '../mocks/testData';

chai.use(chaiHttp);
const { expect } = chai;
const { admin, nonAdmin, deactivatedUser } = reportDetails;
let adminToken;
let userToken;
let deactivatedToken;

describe('Comments Endpoint API Test', () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(deactivatedUser)
      .end((err, res) => {
        deactivatedToken = res.body.data.token;
      });
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(nonAdmin)
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  describe('Comments POST REQUESTS', () => {
    it('Admin should be able to delete report', (done) => {
      chai.request(app)
        .delete('/api/v1/artsreport/2/1')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Successfully closed report id 2');
          expect(res.status).to.equal(202);
          done(err);
        });
    });
    it('Non dmin should not be able to delete report', (done) => {
      chai.request(app)
        .delete('/api/v1/artsreport/2/1')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.body.messages).eql('You are not authorized to access this route');
          expect(res.status).to.equal(401);
          done(err);
        });
    });
    it('Admin should be able to warn a defaulter', (done) => {
      chai.request(app)
        .put('/api/v1/artsreport/1?reporterId=1&artId=5&defaulterId=7')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Successfully deletes art and user  for the first time');
          expect(res.status).to.equal(201);
          done(err);
        });
    });
    it('Admin should be able to warn a defaulter second time', (done) => {
      chai.request(app)
        .put('/api/v1/artsreport/1?reporterId=1&artId=5&defaulterId=7')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Successfully deletes art and user warned');
          expect(res.status).to.equal(202);
          done(err);
        });
    });
    it('Admin should be able to warn a defaulter third time and deactivated', (done) => {
      chai.request(app)
        .put('/api/v1/artsreport/1?reporterId=1&artId=5&defaulterId=7')
        .set('Authorization', adminToken)
        .end((err, res) => {
          expect(res.body.messages).eql('Successfully deletes art and user removed');
          expect(res.status).to.equal(202);
          done(err);
        });
    });
    it('Deactivated user should not be able to access any routes', (done) => {
      chai.request(app)
        .post('/api/v1/arts/comments/1')
        .set('Authorization', deactivatedToken)
        .end((err, res) => {
          expect(res.body.messages).eql('This account has been deactivated');
          expect(res.status).to.equal(401);
          done(err);
        });
    });
  });
});
