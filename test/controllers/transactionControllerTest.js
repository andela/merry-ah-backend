import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../src/index';
import { userDetails } from '../mocks/testData';

chai.use(chaiHttp);
const { expect } = chai;
const { validUser } = userDetails;
let loginToken;
let mockLoginUser;

describe('Pre-Transactions Test', () => {
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

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'mockuser@gmail.com',
        password: 'femiok'
      })
      .end((err, req) => {
        const { token } = req.body.data;
        mockLoginUser = token;
        done(err);
      });
  });

  it('Should return unauthorized when invalid token is set', (done) => {
    chai.request(app)
      .post('/api/v1/transaction/purchase/1')
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
  it('Should return invalid credentials for non-existent art items', (done) => {
    chai.request(app)
      .post('/api/v1/transaction/purchase/1000')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).eql('Item/Art ID Does not exist');
        done(err);
      });
  });
  it('Should return art not avaialble for sale', (done) => {
    chai.request(app)
      .post('/api/v1/transaction/purchase/1')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).eql('Art is not available for sale');
        done(err);
      });
  });
  it('Should return item purcahsed', (done) => {
    chai.request(app)
      .post('/api/v1/transaction/purchase/2')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(201);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Art has been purchased');
        expect(res.body.status).eql('Created');
        expect(res.body.data).to.be.a('object');
        done(err);
      });
  });
  it('Should return item has been sold', (done) => {
    chai.request(app)
      .post('/api/v1/transaction/purchase/2')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).eql('Art is not available for sale');
        done(err);
      });
  });
  it('Should return Artist can not buy his Item', (done) => {
    chai.request(app)
      .post('/api/v1/transaction/purchase/4')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).eql('Artist Can not buy his own Item');
        done(err);
      });
  });
  it('Should return There is no receipt for a non-existent artwork', (done) => {
    chai.request(app)
      .get('/api/v1/transaction/receipt/2000')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0])
          .eql('There is no receipt for a non-existent artwork');
        done(err);
      });
  });
  it('Should return This Item is still available for sale', (done) => {
    chai.request(app)
      .get('/api/v1/transaction/receipt/4')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).eql('This Item is still available for sale');
        done(err);
      });
  });
  it('Should return Receipt was found', (done) => {
    chai.request(app)
      .get('/api/v1/transaction/receipt/2')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Receipt was found');
        expect(res.body.status).eql('Ok');
        expect(res.body.data).to.be.a('object');
        done(err);
      });
  });
  it('Should return array of transactions', (done) => {
    chai.request(app)
      .get('/api/v1/transaction/')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.messages)
          .eql(`${res.body.data.length} transaction(s) found`);
        expect(res.body.status).eql('Ok');
        expect(res.body.data).to.be.a('array');
        done(err);
      });
  });
  it('Should return array of 0 transactions', (done) => {
    chai.request(app)
      .get('/api/v1/transaction/')
      .set('x-access-token', `${mockLoginUser}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.messages)
          .eql(`${res.body.data.length} transaction(s) found`);
        expect(res.body.status).eql('Ok');
        expect(res.body.data).to.be.a('array');
        done(err);
      });
  });
});
