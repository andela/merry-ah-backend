import 'babel-polyfill'
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { userDetails } from '../mocks/testData';


chai.use(chaiHttp);
const { expect } = chai;
const {
    validUser,
    invalidUser
} = userDetails;
let token;
describe('Users Endpoint API Test', () => {

  describe('USERS POST REQUESTS', () => {
    it('it should signup a valid user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(validUser)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.messages).eql('User created successfully and verification link sent to your Email');
          expect(res.body.data).to.have.property('token');
          expect(res.status).to.equal(201);
          token = res.body.data.token;
          done();
        });
    });
    it('it should not signup an invalid user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send({})
          .end((err, res) => {
            expect(res.body.status).eql('Not ok');
            done();
          });
      });
      it('it should not signup an invalid email', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(invalidUser)
          .end((err, res) => {
            expect(res.body.status).eql('Bad request');
            expect(res.body.messages).eql('There was a problem sending');
            done();
          });
      });
  });
 
});
