import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { artDetails, userDetails } from '../mocks/testData';

let jwtToken, jwtToken2, validUpdatedArticleSlug;

chai.use(chaiHttp);
const { expect } = chai;
const {
  validArticle, validUpdatedArticle,
  invalidArticle, invalidUpdatedArticle, invalidUpdatedArticleCategory
} = artDetails;
const { validUser, validUserTT } = userDetails;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send(validUser)
    .end((err, res) => {
      done();
      jwtToken = res.body.data.token;
      return jwtToken;
    });
});

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(validUserTT)
    .end((err, res) => {
      done();
      jwtToken2 = res.body.data.token;
      return jwtToken2;
    });
});


describe('Arts Endpoint API Test', () => {
  describe('ARTS POST REQUESTS', () => {
    it('it should create a new article', (done) => {
      chai.request(app)
        .post('/api/v1/arts')
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
          validUpdatedArticleSlug = res.body.data.slugifiedTitle;
          done(err);
        });
    });

    it('it should not create an invalid or semi-filled article', (done) => {
      chai.request(app)
        .post('/api/v1/arts')
        .set('x-access-token', jwtToken)
        .send(invalidArticle)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Not Ok');
          expect(res.body.messages).eql('Validation Errors Occurred');
          done(err);
        });
    });

    it('it should not create an article with invalid category', (done) => {
      chai.request(app)
        .post('/api/v1/arts')
        .set('x-access-token', jwtToken)
        .send(invalidUpdatedArticleCategory)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.status).eql('Not Ok');
          done(err);
        });
    });

    it('it should not create an article without authorization', (done) => {
      chai.request(app)
        .post('/api/v1/arts')
        .send(validArticle)
        .end((err, res) => {
          expect(res.body.status).eql('error');
          done(err);
        });
    });

    it('it should not create an empty article', (done) => {
      chai.request(app)
        .post('/api/v1/arts')
        .send({})
        .end((err, res) => {
          expect(res.body.status).eql('error');
          done(err);
        });
    });
  });

  describe('ARTS PUT REQUESTS', () => {
    it('it should update an article', (done) => {
      chai.request(app)
        .put(`/api/v1/arts/${validUpdatedArticleSlug}`)
        .set('x-access-token', jwtToken)
        .send(validUpdatedArticle)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.status).eql('Ok');
          expect(res.status).to.equal(200);
          expect(res.body.messages).eql('Article updated successfully');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data).to.have.property('slug');
          expect(res.body.data).to.have.property('description');
          expect(res.body.data).to.have.property('categoryId');
          expect(res.body.data).to.have.property('featuredImg');
          validUpdatedArticleSlug = res.body.data.slug;
          done(err);
        });
    });

    it('it should not update an article with invalid Category', (done) => {
      chai.request(app)
        .put(`/api/v1/arts/${validUpdatedArticleSlug}`)
        .set('x-access-token', jwtToken)
        .send(invalidUpdatedArticleCategory)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.status).eql('Not ok');
          done(err);
        });
    });

    it('it should not update an article with invalid Author Id', (done) => {
      chai.request(app)
        .put(`/api/v1/arts/${validUpdatedArticleSlug}`)
        .set('x-access-token', jwtToken2)
        .send(validUpdatedArticle)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).eql('Not Ok');
          expect(res.body.messages).eql('Unauthorized to Edit Article');
          done(err);
        });
    });

    it('it should not update an article with invalid request data', (done) => {
      chai.request(app)
        .put(`/api/v1/arts/${validUpdatedArticleSlug}`)
        .set('x-access-token', jwtToken)
        .send(invalidUpdatedArticle)
        .end((err, res) => {
          expect(res.body.messages).eql('Validation Errors Occurred');
          expect(res.status).to.equal(400);
          expect(res.body.status).eql('Not Ok');
          done(err);
        });
    });

    it('it should not update an article with invalid slug', (done) => {
      chai.request(app)
        .put('/api/v1/arts/ss-slug')
        .set('x-access-token', jwtToken)
        .send(invalidUpdatedArticle)
        .end((err, res) => {
          expect(res.body.messages).eql('Sorry. Article Not Found');
          expect(res.status).to.equal(404);
          expect(res.body.status).eql('Not Found');
          done(err);
        });
    });
  });

  describe('ARTS DELETE REQUESTS', () => {
    it('it should not delete an article with invalid SLUG', (done) => {
      chai.request(app)
        .delete('/api/v1/arts/ss-slug')
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          expect(res.body.status).eql('Not Found');
          expect(res.status).to.equal(404);
          expect(res.body.messages).eql('Sorry. Article Not Found');
          done(err);
        });
    });

    it('it should not delete an article with invalid Author Id', (done) => {
      chai.request(app)
        .delete(`/api/v1/arts/${validUpdatedArticleSlug}`)
        .set('x-access-token', jwtToken2)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).eql('Not Ok');
          expect(res.body.messages).eql('Unauthorized to Delete Article');
          done(err);
        });
    });

    it('it should delete an article with valid SLUG', (done) => {
      chai.request(app)
        .delete(`/api/v1/arts/${validUpdatedArticleSlug}`)
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).eql('Ok');
          expect(res.body.messages).eql('Article deleted successfully');
          expect(res.body.data).to.have.property('artToDelete');
          done(err);
        });
    });
  });
});
