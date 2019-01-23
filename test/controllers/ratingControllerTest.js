import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { userDetails } from '../mocks/testData';

chai.use(chaiHttp);
const { expect } = chai;
const { validUser } = userDetails;
let loginToken;
let mockLoginUser;

describe('Pre-Rating Test', () => {
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

  it('set Invalid token for Rate Route', (done) => {
    chai.request(app)
      .post('/api/v1/rate/1')
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
  it('set Valid Token for Rate Route in wrong field', (done) => {
    chai.request(app)
      .post('/api/v1/rate/1')
      .set('x-access-token', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).eql('Token is required to access this route');
        done(err);
      });
  });
  it('set Valid Token for Rate Route in correct field without data', (done) => {
    chai.request(app)
      .post('/api/v1/rate/1')
      .set('authorization', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).eql('Rating value is required');
        done(err);
      });
  });
  it('Creators should not be allowed to rate their items', (done) => {
    chai.request(app)
      .post('/api/v1/rate/1')
      .set('authorization', `${loginToken}`)
      .send({ rating: 5 })
      .end((err, res) => {
        expect(400);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Invalid Credentials');
        expect(res.body.status).eql('Bad Request');
        expect(res.body.data).to.be.a('array');
        expect(res
          .body
          .data[0])
          .eql('Creators are not allowed to rate their own items');
        done(err);
      });
  });
  it('Rate an item', (done) => {
    chai.request(app)
      .post('/api/v1/rate/2')
      .set('authorization', `${loginToken}`)
      .send({ rating: 5 })
      .end((err, res) => {
        expect(201);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Rating has been added');
        expect(res.body.status).eql('Ok');
        done(err);
      });
  });
  it('Get Rating for an item', (done) => {
    chai.request(app)
      .get('/api/v1/rate/2')
      .set('authorization', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Art Rating Exists');
        expect(res.body.status).eql('Ok');
        done(err);
      });
  });
  it('Get Rating for an item(item doesnt exist)', (done) => {
    chai.request(app)
      .get('/api/v1/rate/20')
      .set('authorization', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.messages).eql('Art Rating Does not exist');
        expect(res.body.status).eql('Ok');
        done(err);
      });
  });
  it('Get Users Rating for an item', (done) => {
    chai.request(app)
      .get('/api/v1/rate/2/user')
      .set('authorization', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.status).eql('Ok');
        done(err);
      });
  });
  it('Second User Rate an item', (done) => {
    chai.request(app)
      .post('/api/v1/rate/2')
      .set('authorization', `${mockLoginUser}`)
      .send({ rating: 4 })
      .end((err, res) => {
        expect(200);
        expect(res.body).to.be.a('object');
        expect(res.body.status).eql('Ok');
        done(err);
      });
  });
  it('Get User Rating for an item(Item doesnt exist)', (done) => {
    chai.request(app)
      .get('/api/v1/rate/200/user')
      .set('authorization', `${loginToken}`)
      .send()
      .end((err, res) => {
        expect(404);
        expect(res.body).to.be.a('object');
        expect(res.body.status).eql('Ok');
        done(err);
      });
  });
});
