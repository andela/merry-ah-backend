/* eslint-disable max-len */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('ReadingStat API endpoint', () => {
  // eslint-disable-next-line no-undef
  it('should return 200, if an article is visted', (done) => {
    chai.request(app)
      .get('/api/v1/arts/1/read')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
});
