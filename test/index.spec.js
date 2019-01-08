import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();
describe('Google', () => {
  describe('GET /', () => {
    it('should reach google homepage', (done) => {
      chai.request('https://google.com.ng')
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
