import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { artDetails, userDetails } from '../mocks/testData';

let jwtToken;

chai.use(chaiHttp);
const { expect } = chai;
const {
  validArticle,
  invalidArticle
} = artDetails;
const { validUser } = userDetails;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(validUser)
    .end((err, res) => {
      done();
      jwtToken = res.body.data.token;
      return jwtToken;
    });
});


describe('Arts Endpoint API Test', () => {
  describe('ARTS POST REQUESTS', () => {
    it('it should create a new article', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('x-access-token', jwtToken)
        .send(validArticle)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages).eql('Article created successfully');
          expect(res.body.data).to.have.property('artTitle');
          expect(res.body.data).to.have.property('slugifiedTitle');
          expect(res.body.data).to.have.property('artDescription');
          expect(res.body.data).to.have.property('artFeaturedImg');
          expect(res.status).to.equal(201);
          done(err);
        });
    });

    it('it should not create an invalid or semi-filled article', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('x-access-token', jwtToken)
        .send(invalidArticle)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Not Ok');
          expect(res.body.messages).eql('Validation Errors Occurred');
          done(err);
        });
    });

    it('it should not create an article without authorization', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(validArticle)
        .end((err, res) => {
          expect(res.body.status).eql('error');
          done(err);
        });
    });

    it('it should not create an empty article', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('error');
          done(err);
        });
    });
  });
});
