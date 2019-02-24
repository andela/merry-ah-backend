import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../src/index';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;

describe('Comments Like Endpoint API Test', () => {
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
  it('it should not like comment with non logged in user', (done) => {
    chai.request(app)
      .post('/api/v1/arts/comments/1/like')
      .end((err, res) => {
        expect(res.body.status).eql('error');
        expect(res.body.message).eql('No token provided');
        done(err);
      });
  });
  it('it should return 404 for a comment not found', (done) => {
    chai.request(app)
      .post('/api/v1/arts/comments/100/like')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).eql('Not Found');
        done(err);
      });
  });
  it('it should like a comment with a valid id', (done) => {
    chai.request(app)
      .post('/api/v1/arts/comments/1/like')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body.messages).eql('Comment liked');
        done(err);
      });
  });
  it('it should not like a comment twice', (done) => {
    chai.request(app)
      .post('/api/v1/arts/comments/1/like')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body.messages).eql('Comment already liked');
        done(err);
      });
  });
  it('it should dislike a comment with a valid id', (done) => {
    chai.request(app)
      .post('/api/v1/arts/comments/1/unlike')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body.code).eql(200);
        done(err);
      });
  });
  it('it should not dislike a comment that is not liked', (done) => {
    chai.request(app)
      .post('/api/v1/arts/comments/2/unlike')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.body.code).eql(400);
        expect(res.body.messages).eql('You never liked this comment');
        done(err);
      });
  });
});
