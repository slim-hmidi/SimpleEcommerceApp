/* eslint-disable no-underscore-dangle */
process.env.NODE_ENV = 'test';
const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const User = require('../../models/User');

chai.use(chaiHttp);

describe('Integration Tests', () => {
  describe('Users', () => {
    beforeEach((done) => {
      User.deleteMany({}, (error) => {
        if (error) done(error);
        done();
      });
    });

    describe('Post /users', () => {
      it('Should create a new user successfully', (done) => {
        const newUser = {
          login: 'user 1',
          password: 'user@pass123',
        };
        chai.request(app)
          .post('/users')
          .send(newUser)
          .end((error, res) => {
            if (error) done(error);
            expect(res.statusCode).to.equal(200);
            expect(res.body.login).to.equal('user 1');
            done();
          });
      });

      it('Should returns an error when the user already exists', (done) => {
        const newUser = {
          login: 'user 1',
          password: 'pass@pass2019',
        };
        User.create(newUser, (err) => {
          if (err) done(err);
          chai.request(app)
            .post('/users')
            .send(newUser)
            .end((error, res) => {
              if (error) done(error);
              expect(res.statusCode).to.equal(400);
              expect(res.error.text).to.includes('User already exists');
              done();
            });
        });
      });
    });


    describe('Authentication', () => {
      it('should authenticate sucessfully', (done) => {
        const newUser = {
          login: 'user 1',
          password: 'pass@pass2019',
        };
        User.create(newUser, (err, user) => {
          if (err) done(err);
          chai.request(app)
            .post('/authenticate')
            .send(newUser)
            .end((error, res) => {
              if (error) done(error);
              const expectedToken = jwt.sign({ id: user._id }, process.env.__SECRET__, {
                expiresIn: 300,
              });
              expect(res.statusCode).to.equal(200);
              expect(res.body.token).to.equal(expectedToken);
              done();
            });
        });
      });

      it('should return an error when the password is wrong', (done) => {
        const newUser = {
          login: 'user 1',
          password: 'pass@pass2019',
        };
        User.create(newUser, (err) => {
          if (err) done(err);
          chai.request(app)
            .post('/authenticate')
            .send({
              login: 'user 1',
              password: 'pass@123',
            })
            .end((error, res) => {
              if (error) done(error);
              expect(res.statusCode).to.equal(401);
              expect(res.error.text).to.includes('Invalid password');
              done();
            });
        });
      });


      it('should return an error when the login is wrong', (done) => {
        const newUser = {
          login: 'user 1',
          password: 'pass@pass2019',
        };
        User.create(newUser, (err) => {
          if (err) done(err);
          chai.request(app)
            .post('/authenticate')
            .send({
              login: 'user 122',
              password: 'pass@123',
            })
            .end((error, res) => {
              if (error) done(error);
              expect(res.statusCode).to.equal(404);
              expect(res.error.text).to.includes('No user found');
              done();
            });
        });
      });
    });
  });
});
