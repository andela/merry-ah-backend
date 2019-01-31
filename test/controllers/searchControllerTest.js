import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Search Endpoint API Test', () => {
  it('should get art based on categories', (done) => {
    chai.request(app)
      .get('/api/v1/search/categories/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).eql('Ok');
        expect(res.body.messages).eql('Returned all arts');
        done(err);
      });
  });
  it('should return not found when category has no art', (done) => {
    chai.request(app)
      .get('/api/v1/search/categories/4')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).eql('Not Found');
        expect(res.body.messages).eql('No arts for this category');
        done(err);
      });
  });
  it('should get art based on keyword', (done) => {
    chai.request(app)
      .get('/api/v1/search/painting')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).eql('Ok');
        expect(res.body.messages).eql('Returned all arts');
        done(err);
      });
  });
  it('should return not found when keyword does not match an art', (done) => {
    chai.request(app)
      .get('/api/v1/search/fxt')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).eql('Not Found');
        expect(res.body.messages).eql('No arts for this keyword');
        done(err);
      });
  });
  it('should get users based on firstname and lastname', (done) => {
    chai.request(app)
      .get('/api/v1/search/users/abejide')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).eql('Ok');
        expect(res.body.messages).eql('Returned all users');
        done(err);
      });
  });
  it('should return not found when keyword does not match a user', (done) => {
    chai.request(app)
      .get('/api/v1/search/users/painting')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).eql('Not Found');
        expect(res.body.messages).eql('No user found');
        done(err);
      });
  });
});
