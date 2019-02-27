import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../src/index';
import { userDetails } from '../mocks/testData';

chai.use(chaiHttp);
const { expect } = chai;
const { validUser } = userDetails;
let loginToken;

describe('Bookmark Tests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(validUser)
      .end((err, req) => {
        const { token } = req.body.data;
        loginToken = token;
        done(err);
      });
  });

  it('set Invalid token for Bookmark Route', (done) => {
    chai.request(app)
      .post('/api/v1/bookmark/art/1')
      .set('x-access-token', 'mnsdsdmdnssndsn')
      .send()
      .end((err, res) => {
        expect(401);
        expect(res.body).to.be.a('object');
        expect(res.body.message).eql('Unauthorized token');
        expect(res.body.status).eql('error');
        done(err);
      });
  });
  it('Bookmark Art', (done) => {
    chai.request(app)
      .post('/api/v1/bookmark/art/1')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(201);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Bookmark has been added');
        expect(res.body.status).eql('Created');
        done(err);
      });
  });
  it('Bookmark non-existent Art', (done) => {
    chai.request(app)
      .post('/api/v1/bookmark/art/1000')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(201);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        done(err);
      });
  });
  it('Same User Bookmark Art Twice', (done) => {
    chai.request(app)
      .post('/api/v1/bookmark/art/1')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('User has already bookmarked this Item : 1');
        expect(res.body.status).eql('Conflict');
        expect(res.body.code).eql(409);
        done(err);
      });
  });
  it('Get all bookmarks for User', (done) => {
    chai.request(app)
      .get('/api/v1/bookmark/')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.messages)
          .eql(`${res.body.data.length} Bookmarks found for user`);
        expect(res.body.status).eql('Ok');
        expect(res.body.code).eql(200);
        done(err);
      });
  });
  it('User Delete Bookmark', (done) => {
    chai.request(app)
      .delete('/api/v1/bookmark/art/1')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(201);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Bookmark has successfully been deleted');
        expect(res.body.status).eql('Accepted');

        done(err);
      });
  });
  it('User Delete non-existent Bookmark', (done) => {
    chai.request(app)
      .delete('/api/v1/bookmark/art/1')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(404);
        expect(res.body).to.be.a('object');
        expect(res.body.messages)
          .eql('Bookmark does not exist or has previously been deleted');
        expect(res.body.status).eql('Not Found');
        expect(res.body.code).eql(404);
        done(err);
      });
  });
  it('Get non-existent bookmarks for User', (done) => {
    chai.request(app)
      .get('/api/v1/bookmark/')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.messages)
          .eql('No Bookmarks was found for User');
        expect(res.body.status).eql('Ok');
        expect(res.body.code).eql(200);
        done(err);
      });
  });
});
