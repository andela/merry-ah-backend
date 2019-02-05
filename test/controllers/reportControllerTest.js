/* eslint-disable max-len */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { reportDetails } from '../mocks/testData';
import { app } from '../../src/index';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;
const { admin, nonAdmin, deactivatedUser } = reportDetails;
let adminToken;
let userToken1;
let deactivatedToken;


describe('Reports Endpoint API Test', () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'email@gmail.com', password: 'abcdefgh' })
      .end((err, res) => {
        userToken = res.body.data.token;
      });
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
        userToken1 = res.body.data.token;
        done(err);
      });
  });
  describe('Report POST REQUESTS', () => {
    it('it should return error for empty fiels', (done) => {
      chai.request(app)
        .post('/api/v1/artsreport/1/report')
        .set('Authorization', userToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });
    it('it should return not found for an art id that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/artsreport/50/report')
        .set('Authorization', userToken)
        .send({
          reportText: 'this is some nad adad'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should return error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/artsreport/1/report')
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('error');
          expect(res.body.message).eql('No token provided');
          done(err);
        });
    });
    it('it should return error if report text is empty', (done) => {
      chai.request(app)
        .post('/api/v1/artsreport/1/report')
        .set('Authorization', userToken)
        .send({
          reportText: ''
        })
        .end((err, res) => {
          expect(res.body.status).eql('Bad Request');
          done(err);
        });
    });
    it('it should create a report if report text  is valid', (done) => {
      chai.request(app)
        .post('/api/v1/artsreport/1/report')
        .set('Authorization', userToken)
        .send({
          reportText: 'sfsfsdfbdjfbdjgdjgbdg',
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
        .get('/api/v1/artsreport/reports')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
  describe('Report Actions', () => {
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
        .set('Authorization', userToken1)
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
