import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../src/index';

chai.use(chaiHttp);
const { expect } = chai;


describe('Categories Endpoint API Test', () => {
  describe('Categories GET REQUESTS', () => {
    it('it should get all categories', (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .end((err, res) => {
          expect(res.body.messages).eql('All Categories');
          expect(res.body.data).to.have.property('categories');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
});
