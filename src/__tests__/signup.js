import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../index';

import { jwtVerifyUserToken } from '../utils/index';
import { validateData, signUpValidationSchema } from '../validation/index';
import userservices from '../services/userservice';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;
let token;
let tokenEmail;
let UserId;

describe('SIGNUP ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(async () => {
    await userservices.deleteUser(UserId);
    request.close();
  });


  describe('SIGNUP SUCCESSFULLY', () => {
    it('should have a status of 201 when user is created', async () => {
      const body = {
        email: 'akps.i@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma250@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      token = response.body.data.token;
      tokenEmail = response.body.data.emailToken;
      UserId = response.body.data.id;
      expect(response.status).to.equal(201);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('ACCOUNT VERIFICATION DURING SIGNUP', () => {
    it('should have a status of 200 when user verify is account', async () => {
      const id = tokenEmail;
      const response = await request.get(`/api/v1/users/email/verify?id=${id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('JWT VERIFY SIGNUP TOKEN', () => {
    it('should verify token', async () => {
      const response = await jwtVerifyUserToken(token);
      expect(response.id).to.equal(UserId);
    }).timeout(0);
  });

  describe('VALIDATE USING JOI LIBRARY', () => {
    it('should validate joi schema', () => {
      const body = {
        email: 'akps.dd@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma340##@@'
      };
      const response = validateData(body, signUpValidationSchema);
      expect(response).to.be.a('object');
      expect(response).to.have.property('error').equal(null);
    }).timeout(0);

    it('Spy function for validatiedate() method', () => {
      const body = {
        email: 'akps.dd@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma340##@@'
      };
      const res = {
        validate: validateData
      };

      const setSpy = sinon.spy(res, 'validate');

      res.validate(body, signUpValidationSchema);

      expect(setSpy.callCount).to.equal(1);
      setSpy.restore();
    }).timeout(0);
  });

  describe('SIGNUP NOT SUCCESSFULLY', () => {
    it('should have a status of 400 with a message of "firstname must be a minimum of 3 character and max of 30" when firstName is below two character or above 30', async () => {
      const body = {
        email: 'akps.i@yahoo.com',
        firstName: 'An',
        lastName: 'Akpan',
        password: 'EMma250@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('firstname must be a minimum of 3 character and max of 30');
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 400 with a message of "lastName must be a minimum of 3 character and max of 30" when lastName is below two character or above 30', async () => {
      const body = {
        email: 'akps.i@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Ak',
        password: 'EMma250@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('lastname must be a minimum of 3 character and max of 30');
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 400 with a message of "Your email is not valid" when invalid email is provided', async () => {
      const body = {
        email: 'akps.iahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma250@@'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Your email is not valid');
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it(`should have a status of 400 with a message of
     "Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character" when password does not meet the required`, async () => {
      const body = {
        email: 'akps.a@iahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'EMma250'
      };
      const response = await request.post('/api/v1/users/auth/register').send(body);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character');
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('EMAIL TOKEN CONFIRMATION ROUTE', () => {
    it('should have a status of 200 when valid token is sent as query string', async () => {
      const id = tokenEmail;
      const response = await request.get(`/api/v1/users/email/verify?id=${id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });
});
